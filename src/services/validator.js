import _ from 'lodash'

let validatorService = {
  checkValid(dataModel, entityModel) {

    let finalModel = _.clone(dataModel)

    let validatedModel = {
      isValid: false
    }

    let finalValue

    for (let modelAttr in dataModel) {
      let entityEl = entityModel[modelAttr]
      let value = dataModel[modelAttr]

      //si el campo en cuestión está vacío, se verifica que no sea un campo obligatorio
      if (value === null ) {
        let isNullable = entityModel[modelAttr].nullable
        if(isNullable)
          continue
        else {
          validatedModel.attrFailed = modelAttr
          validatedModel.message = `El campo '${entityModel[modelAttr].alias}' es obligatorio`
          return validatedModel
        }
      }

      //trim elimina los espacios al comienzo y final de la cadena de caracteres
      value = String(value)
      value = value.trim()

      if (entityEl.type === "String") {

        let fieldLength = value.length
        let charLimit = entityEl.charLimit
        if(!charLimit)
        charLimit = 45

        if (fieldLength > charLimit) {
          validatedModel.attrFailed = modelAttr
          validatedModel.message = `El número máximo de caracteres permitidos en '${entityModel[modelAttr].alias}' es ${charLimit}`
          return validatedModel
        }

        let finalStates = entityEl.finalState
        if (_.indexOf(finalStates, 'no-dash') != -1) {
          value = value.split('-').join('')
        }

        let initialStates = entityEl.initialState
        if (typeof initialStates !== 'undefined'
        && typeof initialStates['static-plus'] !== 'undefined') {
          let staticValue = initialStates['static-plus'].static
          let plusAttr = initialStates['static-plus'].plus
          let plusValue = dataModel[plusAttr]
          plusValue = plusValue.split('-').join('')
          value = staticValue + plusValue
        }

        finalValue = value
      }
      else if (entityEl.type === "Number") {

        // por el momento los únicos campos que son tipo number son las claves foráneas
        // no es necesario validarlas
        finalValue = +value
      }
      else if (entityEl.type === "_Date") {
        //formato dd MMM aaaa hh:mm am|pm
        let pattern =
        /^((\d{1,2})\s([a-zA-Z]{3})\s(\d+))\s((\d{1,2}):(\d{2})\s?([AaPp][Mm]))$/

        var patternMatch = value.match(pattern)

        if(!patternMatch) {
          validatedModel.attrFailed = modelAttr
          validatedModel.message = `La fecha ingresada en '${entityModel[modelAttr].alias}' no tiene el formato correcto`
          validatedModel.details = 'Formato correcto: dd MMM aaaa hh:mm am|pm'
          return validatedModel
        }

        //date
        let _month = patternMatch[3]
        let _day = patternMatch[2]
        let _year = patternMatch[4]
        //time
        let _hours = patternMatch[6]
        let _minutes = patternMatch[7]
        let _acronym = patternMatch[8]

        let months = [
          'Ene','Feb','Mar','Abr','May','Jun',
          'Jul','Ago','Sep','Oct','Nov','Dic',]

        // VALIDACIÓN DE MES
        let month = _.capitalize(_month)
        let monthNumber = _.indexOf(months, month)
        if (monthNumber == -1) {
          validatedModel.attrFailed = modelAttr
          validatedModel.message = `El mes ingresado en '${entityModel[modelAttr].alias}' (${_month}) no existe`
          return validatedModel
        }

        // VALIDACIÓN DEL DÍA
        let day = +_day
        if (day < 1 || day > 31) {
          validatedModel.attrFailed = modelAttr
          validatedModel.message = `Ingrese un día entre 1 y 31 en '${entityModel[modelAttr].alias}'`
          return validatedModel
        }

        // VALIDACIÓN DEL AÑO
        let year = +_year
        if (year < 1950 || year > 2200) {
          validatedModel.attrFailed = modelAttr
          validatedModel.message = `Ingrese un año entre 1950 y 2200 en '${entityModel[modelAttr].alias}'`
          return validatedModel
        }

        // VALIDACIÓN DEL LAS HORAS
        let hours = +_hours
        if (hours < 1 || hours > 12) {
          validatedModel.attrFailed = modelAttr
          validatedModel.message = `Ingrese una hora entre 1 y 12 en '${entityModel[modelAttr].alias}'`
          return validatedModel
        }
        // VALIDACIÓN DEL LOS MINUTOS
        let minutes = +_minutes
        if (minutes > 59) {
          validatedModel.attrFailed = modelAttr
          validatedModel.message = `Ingrese minutos entre 0 y 59 en '${entityModel[modelAttr].alias}'`
          return validatedModel
        }
        // LAS SIGLAS AM O PM SON VALIDADAS POR LA MISMA EXPRESIÓN REGULAR
        let acronym = _.toUpper(_acronym)

        //12 am == 00:00
        //12 pm == 12:00
        if(acronym == 'PM' && hours<12) {
          hours += 12
        }
        else if(acronym == 'AM' && hours==12) {
          hours = 0
        }

        let finalDate = `${year}-${monthNumber+1}-${day} ${hours}:${minutes}:00`
        finalValue = finalDate
      }
      else if (entityEl.type === "Duration") {
        // RegEx extraído de stackoverflow.com
          // con título Regex pattern for HH:MM:SS time string
          // El RegEx fue modificado
          let pattern =
            /^(?:(?:(\d+):)?([0-5]?\d):)?([0-5]?\d)$/

          var patternMatch = value.match(pattern)

          if(!patternMatch) {
            validatedModel.attrFailed = modelAttr
            validatedModel.message = `La duración ingresada en '${entityModel[modelAttr].alias}' no tiene el formato correcto`
            validatedModel.details = 'Formato correcto: hh:mm:ss'
            return validatedModel
          }

          let hours = patternMatch[1]
          let minutes = patternMatch[2]
          let seconds = patternMatch[3]
          hours = hours ? +hours : 0
          minutes = minutes ? +minutes : 0
          seconds = +seconds

          finalValue = hours*60*60 + minutes*60 + seconds
      }
      else if (entityEl.type === "ByteWeight") {
        //uno o más dígitos, con o sin espacios, y uno o dos caracteres
          let pattern =
            /^(\d+)\s*([a-zA-Z]{1,2})$/

          var patternMatch = value.match(pattern)

          if(!patternMatch) {
            validatedModel.attrFailed = modelAttr
            validatedModel.message = `El peso ingresado '${entityModel[modelAttr].alias}' no tiene el formato correcto`
            validatedModel.details = 'Formato correcto: dd [B|kB|MB|GB]'
            return validatedModel
          }

          let _number = patternMatch[1]
          let _unit = patternMatch[2]
          let number = +_number
          let unit = _.toUpper(_unit)

          if (unit === 'B') {
            // :)
          } else if (unit === 'KB') {
            number = number*1024
          } else if (unit === 'MB') {
            number = number*1024*1024
          } else if (unit === 'GB') {
            number = number*1024*1024*1024
          } else {
            validatedModel.attrFailed = modelAttr
            validatedModel.message = `Ingrese una unidad correcta (B, kB, MB o GB) en '${entityModel[modelAttr].alias}'`
            return validatedModel
          }

          finalValue = number
      }

      finalModel[modelAttr] = finalValue
    }

    validatedModel.isValid = true
    validatedModel.model = finalModel

    return validatedModel
  }
}

export default validatorService
