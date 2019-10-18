import Validator from './validator.class'
import _ from 'lodash'

class FormValidator {
  constructor(data, model) {
    this.data = data,
    this.model = model
  }

  validateForm() {
    let finalModel = _.clone(this.model)
    delete finalModel['_metadata']

    for (let fieldName in finalModel) {
      let fieldModel = this.model[fieldName]
      let fieldValue = this.data[fieldName]

      //checkar campos obligatorios
      if (this.isMissingField(fieldValue, fieldModel)) {
        throw {
          comment: 'missing field',
          fieldName: fieldModel.alias,
        }
      }

      // obtener la forma válida de campo por campo
      try {
        finalModel[fieldName] = Validator.validateByModel(fieldValue, fieldModel)
      }
      catch(error) {
        error['fieldName'] = fieldModel.alias
        throw (error)
      }
    }
    let validatedModel = {
      isValid: true,
      model: finalModel,
    }
    return validatedModel
  }

  isMissingField(fieldValue, fieldModel) {
    fieldValue = (String(fieldValue).trim() == '') ? null : fieldValue
    if (fieldValue === null ) {
      let isNullable = fieldModel.isNullable
      return !isNullable
    }
  }
}

export default FormValidator
