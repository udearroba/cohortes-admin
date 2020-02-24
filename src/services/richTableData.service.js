import axios from 'axios'
import apiRoutes from './apiRoutes'
import _ from 'lodash'

import richTableModel from '../models/richTable.model'
import fieldsGenerator from '../services/richTableMissingFieldsGenerator.utils'

let funcs = {
  async getRichTableData(limit, offset) {
    return axios.get(apiRoutes.getReunionesEnriquecidas2(limit, offset))
  },
  async getReunionesCount(limit) {
    let count = await axios.get(apiRoutes.getCountReuniones())
    count = count.data.count
    return count 
  },
  processData(data) {
    let finalData = []

    for (let index = 0; index < data.length; index++) {
      const register = data[index]
      const registerFields = Object.keys(register)
      let finalRegister = []
      let findAnyNeededField = false
      for (let j = 0; j < registerFields.length; j++) {
        //normalmente 'field' es una tabla en la BD, pero no necesariamente debe ser así
        const field = registerFields[j]
        const fieldRegister = register[field]
        const model = richTableModel.fields[field]
        // ❌❌❌ SI ELIMINO LOS CAMPOS DE LA TABLA REUNIÓN EN EL MODELO SE GENERA UN ERROR EN LA SIGUIENTE LINEA. REVISAR. ❌❌❌
        const modelKeys = Object.keys(richTableModel.fields[field])
        //processedRegister: registo procesado de una ÚNICA TABLA sólo con los campos necesarios (según richTable.model)
        let processedRegister = _.pick(fieldRegister, modelKeys)

        const processedKeys = Object.keys(processedRegister)
        //missingKeys: son las llaves que no pueden extraerse directemente desde la BD
        const missingKeys = _.difference(modelKeys, processedKeys)

        if (missingKeys.length != 0) {
          const missingInfo = fieldsGenerator.getMissingInfo(field, fieldRegister, missingKeys)
          _.merge(processedRegister, missingInfo)
        }

        //los datos se organizan de forma que la tabla pueda leerlos correctamente
        let finalField = {}
        Object.entries(processedRegister).forEach(([key,value])=>{
          finalField.title = key
          finalField.info = value.toString()
          
          //se añaden los campos adicionales que hay en el modelo necesarios en la UI para, por ejemplo, el renderizado según el tipo de campo (e.g link)
          const _extra = _.cloneDeep(model[key])
          if(Object.keys(_extra).length > 0) {
            finalField.extra = _extra
            finalRegister.push(_.cloneDeep(finalField))
            if (finalField.extra.needed)
              findAnyNeededField = true
          }
          //se añade el identificador al campo
          finalField.id = {}
          finalField.id.field = field
          finalField.id.register = fieldRegister
        })
        // COMPARAR LAS LLAVES DEL OBJETO Y LAS LLAVES DEL MODELO (puede usarse Object.keys())
      }
      if (findAnyNeededField) {
        finalData.push(_.cloneDeep(finalRegister))
      }
      // QUITAR DEL REGISTO CAMPOS QUE NO APAREZCAN EN EL MODELO
    }
    return finalData
  },
  async getData(limit, offset) {
    let data = await this.getRichTableData(limit, offset)
    data = data.data
    data = this.processData(data)
    return data
  },
}

export default funcs;
