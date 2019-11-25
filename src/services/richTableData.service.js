import axios from 'axios'
import apiRoutes from './apiRoutes'
import _ from 'lodash'

import richTableModel from '../models/richTable.model'

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
    return allData
  },
  processData(data) {
    let finalData = []
    for (let index = 0; index < data.length; index++) {
      const register = data[index]
      const registerFields = Object.keys(register)
      let finalRegister = []

      for (let j = 0; j < registerFields.length; j++) {
        const field = registerFields[j]
        const fieldRegister = register[field]
        const model = richTableModel.fields[field]
        const modelKeys = Object.keys(richTableModel.fields[field])
        let processedRegister = _.pick(fieldRegister, modelKeys)

        const processedKeys = Object.keys(processedRegister)
        const missingKeys = _.difference(modelKeys, processedKeys)
        //ES NECESARIO PROCESSAR LAS MISSING KEYS

        let finalField = {}
        Object.entries(processedRegister).forEach(([key,value])=>{
          finalField.title = model[key].title ? model[key].title : key
          finalField.info = value.toString()
          finalRegister.push(_.cloneDeep(finalField))
        })

        finalData.push(_.cloneDeep(finalRegister))
        // COMPARAR LAS LLAVES DEL OBJETO Y LAS LLAVES DEL MODELO (puede usarse Object.keys())
      }
      // QUITAR DEL REGISTO CAMPOS QUE NO APAREZCAN EN EL MODELO
    }
    return finalData
  },
  async getData() {
    let data = await this._getHttpData()
    let concatenatedData = this._concatenateData(data.reuniones, data.ocurrencias, data.grabaciones, data.archivos)
    // console.log(concatenatedData)
    return this.processData(concatenatedData)
  }
}

export default funcs;
