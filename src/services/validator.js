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
      else if (entityEl.type === "UnixTime") {
        //no hay necesidad de validar debido al picker
        finalValue = new Date(value).getTime()/1000
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
        //numero entero o con decimales, con o sin espacios, y uno o dos caracteres
          let pattern =
            /^(\d+)(?:\.(\d{1,2}))?\s*([a-zA-Z]{1,2})$/

          var patternMatch = value.match(pattern)

          if(!patternMatch) {
            validatedModel.attrFailed = modelAttr
            validatedModel.message = `El peso ingresado '${entityModel[modelAttr].alias}' no tiene el formato correcto`
            validatedModel.details = 'Formato correcto: number [B|kB|MB|GB]'
            return validatedModel
          }

          let _number = patternMatch[1]
          let _decimal = patternMatch[2]
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
            validatedModel.attrFailed = modelAttr
            validatedModel.message = `Ingrese una unidad correcta (B, kB, MB o GB) en '${entityModel[modelAttr].alias}'`
            return validatedModel
          }

          finalValue = weight
      }

      finalModel[modelAttr] = finalValue
    }

    validatedModel.isValid = true
    validatedModel.model = finalModel

    return validatedModel
  }
}

export default validatorService
