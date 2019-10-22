class Validator {

  static getValidString(value, constraints) {
    let fieldLength = value.length
    let charLimit = constraints ? constraints.charLimit : 45

    if (fieldLength > charLimit) {
      throw {
        comment: 'max char reached',
        details: {
          fieldLength: fieldLength,
          charLimit: charLimit,
        }
      }
    }
    return value
  }

  static getValidByteWeight(value) {
    let pattern =
          /^(\d+)(?:\.(\d+))?\s*([a-zA-Z]{1,2})$/

    var patternMatch = value.match(pattern)

    if(!patternMatch) {
      throw {
        comment: 'wrong format',
      }
    }

    let _number = patternMatch[1]
    let _decimal = patternMatch[2] ? patternMatch[2] : 0
    let _unit = patternMatch[3]
    let unit = _.toUpper(_unit)
    let weight = +(_number+'.'+_decimal)

    if (unit === 'B') {
      // :)
    } else if (unit === 'KB') {
      weight = weight*1000
    } else if (unit === 'MB') {
      weight = weight*1000*1000
    } else if (unit === 'GB') {
      weight = weight*1000*1000*1000
    } else {
      throw {
        comment: 'wrong format',
        details: {
          comment: 'wrong unit',
          unit: unit
          }
      }
    }
    return weight
  }

  static getValidDuration(value) {
    // RegEx extraído de stackoverflow.com
    // con título Regex pattern for HH:MM:SS time string
    // El RegEx fue modificado
    let pattern =
      /^(?:(?:(\d+):)?([0-5]?\d):)?([0-5]?\d)$/

    var patternMatch = value.match(pattern)

    if(!patternMatch) {
      throw {
        comment: 'wrong format',
      }
    }

    let hours = patternMatch[1]
    let minutes = patternMatch[2]
    let seconds = patternMatch[3]
    hours = hours ? +hours : 0
    minutes = minutes ? +minutes : 0
    seconds = +seconds

    return hours*60*60 + minutes*60 + seconds
  }

  static getValidUnixTime(value) {
    let months = {
      'Ene': 'Jan',
      'Abr': 'Apr',
      'Ago': 'Aug',
      'Dic': 'Dec',
    }
    Object.keys(months).forEach(month => {
      if (value.includes(month)) {
        value = value.replace(month, months[month])
        //sería bueno hacer un break aquí, pero la sintaxis para hacerlo en un
        // ciclo forEach es muy fea
      }
    })
    return new Date(value).getTime()/1000
  }

  //sin completar
  static getValidNumber(value) {
    return +value
  }

  static validateByModel(value_, model) {

    let typeNfunctions = {
      'String': this.getValidString,
      'ByteWeight': this.getValidByteWeight,
      'Duration': this.getValidDuration,
      'UnixTime': this.getValidUnixTime,
      'Number': this.getValidNumber,
    }

    let constraints = {}

    if(model.type == "String") {
      constraints['charLimit'] = model.charLimit
    }
    let value =   String(value_)
    value = value.trim()
    return typeNfunctions[model.type](value, constraints)
  }
}

export default Validator
