import axios from 'axios'
import apiRoutes from './apiRoutes'
import _ from 'lodash'

import richTableModel from '../models/richTable.model'
import fieldsGenerator from '../services/richTableMissingFieldsGenerator.utils'

let funcs = {
  async getReuniones() {
    return axios.get(apiRoutes.reunionesRoute)
  },
  async getOcurrencias() {
    return axios.get(apiRoutes.ocurrenciasRoute)
  },
  async getGrabaciones() {
    return axios.get(apiRoutes.grabacionesRoute)
  },
  async getArchivos() {
    return axios.get(apiRoutes.archivosRoute)
  },
  async getOcurrenciasFromIdReunion(idReunion) {
    return axios.get(apiRoutes.getOcurrenciasFromIdReunion(idReunion))
  },
  async getRichTableData(limit) {
    return axios.get(apiRoutes.getReunionesEnriquecidas(limit))
  },
  async getRichTableData2(limit) {
    return axios.get(apiRoutes.getReunionesEnriquecidas2(limit))
  },
  async _getHttpData() {
    let [reuniones, ocurrencias, grabaciones, archivos] = await Promise.all([
      this.getReuniones(),
      this.getOcurrencias(),
      this.getGrabaciones(),
      this.getArchivos(),
    ])

    return {
      reuniones: reuniones.data,
      ocurrencias: ocurrencias.data,
      grabaciones: grabaciones.data,
      archivos: archivos.data
    }
  },
  _concatenateData(reuniones, ocurrencias, grabaciones, archivos) {
    let allData = []
    for (let index = 0; index < reuniones.length; index++) {
      let element = {}
      let reunion = reuniones[index]
      let reunionId = reunion.id
      element['reunion'] = reunion
      let _ocurrencias = _.filter(ocurrencias, {'reunionvideoconferenciaId': reunionId})

      if(_ocurrencias.length == 0) {
        allData.push(_.cloneDeep(element))
        continue
      }
      for (let index = 0; index < _ocurrencias.length; index++) {
        let ocurrencia = _ocurrencias[index]
        let ocurrenciaId = ocurrencia.id
        element['ocurrencia'] = ocurrencia
        let _grabaciones = _.filter(grabaciones, {'ocurrenciaId': ocurrenciaId})

        if(_grabaciones.length == 0) {
          allData.push(_.cloneDeep(element))
          continue
        }
        for (let index = 0; index < _grabaciones.length; index++) {
          let grabacion = _grabaciones[index]
          let grabacionId = grabacion.id
          element['grabacion'] = grabacion
          let _archivos = _.filter(archivos, {'grabacionId': grabacionId})

          if(_archivos.length == 0) {
            allData.push(_.cloneDeep(element))
            continue
          }
          for (let index = 0; index < _archivos.length; index++) {
            let archivo = _archivos[index]
            element['archivo'] = archivo
            allData.push(_.cloneDeep(element))
          }
        }
      }
    }
    console.log(allData)
    return allData
  },
  _thereAreNeededFields() {
    let bool = false
    _.forIn(richTableModel.fields, (value) => {
      _.forIn(value, (value2) => {
        if(value2.needed) {
          bool = true
          return true
        }
        if (bool)
          return true
      })
    })
    return bool
  },
  processData(data) {
    let finalData = []

    const areNeededFields = this._thereAreNeededFields()
    for (let index = 0; index < data.length; index++) {
      const register = data[index]
      const registerFields = Object.keys(register)
      let finalRegister = []

      for (let j = 0; j < registerFields.length; j++) {
        const field = registerFields[j]
        //normalmente 'field' es una tabla en la BD, pero no necesariamente debe ser así
        const fieldRegister = register[field]
        const model = richTableModel.fields[field]
        // ❌❌❌ SI ELIMINO LOS CAMPOS DE LA TABLA REUNIÓN EN EL MODELO SE GENERA UN ERROR EN LA SIGUIENTE LINEA. REVISAR. ❌❌❌
        const modelKeys = Object.keys(richTableModel.fields[field])
        let processedRegister = _.pick(fieldRegister, modelKeys)
        //processedRegister: registo procesado de una ÚNICA TABLA sólo con los campos necesarios (según richTable.model)

        const processedKeys = Object.keys(processedRegister)
        const missingKeys = _.difference(modelKeys, processedKeys)
        //missingKeys: son las llaves que no pueden extraerse directemente desde la BD

        if (missingKeys.length != 0) {
          const missingInfo = fieldsGenerator.getMissingInfo(field, fieldRegister, missingKeys)
          _.merge(processedRegister, missingInfo)
        }

        let finalField = {}
        let findAnyNeededField = false
        //los datos se organizan de forma que la tabla pueda leerlos correctamente
        Object.entries(processedRegister).forEach(([key,value])=>{
          finalField.title = key
          finalField.info = value.toString()

          const _extra = _.cloneDeep(model[key]) // ⚠️⚠️ En caso de que no se elimine ninguna llave del modelo, no es necesaria esta linea. Revisar ⚠️⚠️
          // delete _extra["title"]

          //se añaden los campos adicionales que hay en el modelo necesarios en la UI para, por ejemplo, el renderizado según el tipo de campo (e.g link)
          if(Object.keys(_extra).length > 0) {
            finalField.extra = _extra
          }
          if (finalField.extra)
            if (finalField.extra.needed)
              findAnyNeededField = true
          finalRegister.push(_.cloneDeep(finalField))
        })

        if (!areNeededFields || findAnyNeededField) {
          finalData.push(_.cloneDeep(finalRegister))
        }
        // COMPARAR LAS LLAVES DEL OBJETO Y LAS LLAVES DEL MODELO (puede usarse Object.keys())
      }

      // QUITAR DEL REGISTO CAMPOS QUE NO APAREZCAN EN EL MODELO
    }
    return finalData
  },
  processData2(data) {
    let finalData = []

    for (let index = 0; index < data.length; index++) {
      const register = data[index]
      const registerFields = Object.keys(register)
      let finalRegister = []
      
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
        // let findAnyNeededField = false
        Object.entries(processedRegister).forEach(([key,value])=>{
          finalField.title = key
          finalField.info = value.toString()
          
          //se añaden los campos adicionales que hay en el modelo necesarios en la UI para, por ejemplo, el renderizado según el tipo de campo (e.g link)
          const _extra = _.cloneDeep(model[key])
          if(Object.keys(_extra).length > 0) {
            finalField.extra = _extra
            finalRegister.push(_.cloneDeep(finalField))
            // if (finalField.extra.needed)
            //   findAnyNeededField = true
          }
        })
        // COMPARAR LAS LLAVES DEL OBJETO Y LAS LLAVES DEL MODELO (puede usarse Object.keys())
      }
      finalData.push(_.cloneDeep(finalRegister))
      // QUITAR DEL REGISTO CAMPOS QUE NO APAREZCAN EN EL MODELO
    }
    return finalData
  },
  processReunion(reunion) {
    // ✔️✔️  En este espacio deberían tomarse sólo los campos que estén en el modelo  ✔️✔️
    // let reunionModel = richTableModel.fields.reunion
    // console.log(reunionModel)

    // ⚠️⚠️  Por ahora se toman todos los campos  ⚠️⚠️
    let reunionData = _.omit(reunion, ['ocurrencias'])
    let ocurrencias = _.pick(reunion, ['ocurrencias'])
    ocurrencias = ocurrencias.ocurrencias
    let ocurrenciasData
    let grabaciones

    let processedReunion = {}
    processedReunion.reunion = {}
    processedReunion.reunion.data = reunionData
    processedReunion.reunion.ocurrencias = []
    
    for (const ocurrencia of ocurrencias) {
      ocurrenciasData = _.omit(ocurrencia, ['grabaciones'])
      grabaciones = _.pick(ocurrencia, ['grabaciones'])
      grabaciones = grabaciones.grabaciones

      for (const archivo of archivos) {
        
      }
      ocurrencia = {}
      ocurrencia.data = ocurrenciasData
      ocurrencia.grabaciones = grabaciones
      processedReunion.reunion.ocurrencias.push(ocurrencia)
    }
    
    return processedReunion
  },
  async getData() {
    let data = await this._getHttpData()
    let concatenatedData = this._concatenateData(data.reuniones, data.ocurrencias, data.grabaciones, data.archivos)
    return this.processData(concatenatedData)
  },
  async getData2(limit) {
    let data = await this.getRichTableData2(limit)
    data = data.data
    data = this.processData2(data)
    return data
  }
}

export default funcs;
