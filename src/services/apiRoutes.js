let API_route="http://localhost:3000"
let reunionesTableName="reunionvideoconferencias"
let ocurrenciasTableName="ocurrencias"
let grabacionesTableName="grabaciones"
let archivosTableName="archivos"
let reunionesRoute=`${API_route}/${reunionesTableName}`
let ocurrenciasRoute=`${API_route}/${ocurrenciasTableName}`
let grabacionesRoute=`${API_route}/${grabacionesTableName}`
let archivosRoute=`${API_route}/${archivosTableName}`

let apiRoutes =  {
  reunionesRoute: reunionesRoute,
  grabacionesRoute: grabacionesRoute,
  ocurrenciasRoute: ocurrenciasRoute,
  archivosRoute: archivosRoute,
  getReunionesFromId: function(idReunion) {
    return `${reunionesRoute}/${idReunion}`
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
  },
}

export default apiRoutes;
