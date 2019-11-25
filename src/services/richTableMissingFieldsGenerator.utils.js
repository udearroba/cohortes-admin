import numberToMonth from '../filters/numberToMonth.filter'

class richTableMissingFieldsGenerator {

  static getMissingInfo(field, fieldRegister, missingKeys) {
    let missingInfo = {}
    for (let index = 0; index < missingKeys.length; index++) {
      const missingKey = missingKeys[index]
      let missingKeyInfo = this._functionsMap[missingKey]
      //es posible que la función que obtiene la información de llave no esté definida
      if (missingKeyInfo) {
        let info = missingKeyInfo.call(this, field, fieldRegister)
        missingInfo[missingKey] = info
      }
    }
    return missingInfo
  }

  static _functionsMap = {
    mesOcurrencia: this.getMesOcurrencia,
    estadoDescarga: this.getEstadoDescarga,
  }

  static getMesOcurrencia(field, fieldRegister) {
    //solo obtiene el mes de la ocurrencia de una ocurrencia
    if (field != 'ocurrencia') {
      return null
    }
    const date = new Date(fieldRegister.starttime*1000)
    return numberToMonth(date.getMonth())
  }

  static getEstadoDescarga(field, fieldRegister) {
    return 'SIN DESCARGAR'
  }
}

export default richTableMissingFieldsGenerator
