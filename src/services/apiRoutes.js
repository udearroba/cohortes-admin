let API_route="http://localhost:3000"
let reunionesTableName="reunionvideoconferencias"
let grabacionesTableName="grabaciones"
let ocurrenciasTableName="ocurrencias"
let reunionesRoute=`${API_route}/${reunionesTableName}`
let grabacionesRoute=`${API_route}/${grabacionesTableName}`
let ocurrenciasRoute=`${API_route}/${ocurrenciasTableName}`

let apiRoutes =  {
  reunionesRoute: reunionesRoute,
  grabacionesRoute: grabacionesRoute,
  ocurrenciasRoute: ocurrenciasRoute,
  getGrabacionesFromId: function(idGrabacion) {
    return `${grabacionesRoute}/${idGrabacion}`
  },
  getGrabacionesFromIdOcurrencia: function(idOcurrencia) {
    return `${ocurrenciasRoute}/${idOcurrencia}/${grabacionesTableName}`
  },
  getOcurrenciasFromId: function(idOcurrencia) {
    return `${ocurrenciasRoute}/${idOcurrencia}`
  },
  getOcurrenciasFromIdReunion: function(idReunion) {
    return `${reunionesRoute}/${idReunion}/${ocurrenciasTableName}`
  },
  getReunionesFromId: function(idReunion) {
    return `${reunionesRoute}/${idReunion}`
  },
}

export default apiRoutes;
