class Transformer {
  static noDash(value) {
    return value.split('-').join('')
  }

  static trimValue(value) {
    return value.trim()
  }

  static validateByModel(value_, model) {
    if(!value_)
      return value_

    // finalState & functions
    let fStateNfunctions = {
      'no-dash': this.noDash,
      'trimmed': this.trimValue,
    }

    let finalStates =  []
    if(model.finalState)
      finalStates.push(...model.finalState)
    if (model.type == "String")
      finalStates.push('trimmed')

    let value = String(value_)
    // se aplican cuantas restricciones hayan establecidad en el modelo
    for (let i = 0; i < finalStates.length; i++) {
      let finalState = finalStates[i]
      value = fStateNfunctions[finalState](value)
    }
    return value
  }
}

export default Transformer
