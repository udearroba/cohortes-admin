let API_route= process.env.VUE_APP_ROOT_API
let reunionesTableName="reunionvideoconferencias"
let ocurrenciasTableName="ocurrencias"
let grabacionesTableName="grabaciones"
let archivosTableName="archivos"
let formulariosTableName="formularios"
let respuestasTableName="respuestas"

let reunionesRoute=`${API_route}/${reunionesTableName}`
let ocurrenciasRoute=`${API_route}/${ocurrenciasTableName}`
let grabacionesRoute=`${API_route}/${grabacionesTableName}`
let archivosRoute=`${API_route}/${archivosTableName}`
let formulariosRoute=`${API_route}/${formulariosTableName}`
let respuestasRoute=`${API_route}/${respuestasTableName}`

let apiRoutes =  {
  reunionesRoute: reunionesRoute,
  grabacionesRoute: grabacionesRoute,
  ocurrenciasRoute: ocurrenciasRoute,
  archivosRoute: archivosRoute,
  formulariosRoute: formulariosRoute,
  respuestasRoute: respuestasRoute,

  getReunionesFromId: function(idReunion) {
    return `${reunionesRoute}/${idReunion}`
  },
  getCountReuniones: function() {
    return `${reunionesRoute}/count`
  },
  getOcurrenciasFromId: function(idOcurrencia) {
    return `${ocurrenciasRoute}/${idOcurrencia}`
  },
  getOcurrenciasFromIdReunion: function(idReunion) {
    return `${reunionesRoute}/${idReunion}/${ocurrenciasTableName}`
  },
  getGrabacionesFromId: function(idGrabacion) {
    return `${grabacionesRoute}/${idGrabacion}`
  },
  getGrabacionesFromIdOcurrencia: function(idOcurrencia) {
    return `${ocurrenciasRoute}/${idOcurrencia}/${grabacionesTableName}`
  },
  getArchivosFromId: function(idArchivo) {
    return `${archivosRoute}/${idArchivo}`
  },
  getArchivosFromIdGrabacion: function(idGrabacion) {
    return `${grabacionesRoute}/${idGrabacion}/${archivosTableName}`
  },getFormulariosFromId: function(idFormulario) {
    return `${formulariosRoute}/${idFormulario}`
  },
  getRespuestasFromId: function(idRespuestas) {
    return `${respuestasRoute}/${idRespuestas}`
  },getRespuestasFromIdFormulario: function(idFormulario) {
    return `${formulariosRoute}/${idFormulario}/${respuestasTableName}`
  },
  
  getReunionesEnriquecidas: function(limit) {
    limit = limit ? limit : 10
    return `${reunionesRoute}/listar?limit=${limit}`
  },
  getReunionesEnriquecidas2: function(limit, offset) {
    limit = limit ? limit : 10
    return `${reunionesRoute}/richTable?limit=${limit}&offset=${offset}`
  },
}

export default apiRoutes;
