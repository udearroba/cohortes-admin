const richTable =  {
  fields: {
    reunion: {
      idsistemaexterno: {
        alias: 'Id sistema externo',
      },
    },
    grabacion: {
      id: {
        alias: 'Id',
      },
      playurl: {
        alias: 'Play URL',
        format: 'link',
      },
      estadoDescarga: {
        alias: 'Almacenado en',
        needed: true,
        format: 'status',
        status: ['Zoom', 'Drive'],
      },
    },
    ocurrencia: {
      starttime: {
        alias: 'Fecha de inicio',
      },
      mesOcurrencia: {
        alias: 'Mes de ocurrencia',
      },
    },
    archivo: {
      idexterno: {
        alias: 'Id externo',
      },
      formato: {
        alias: 'Formato',
      },
      url: {
        alias: 'Url',
        format: 'link',
      },
      estadoDescarga: {
        alias: 'Estado descarga de archivo',
        needed: true,
        format: 'status',
        status: ['Descargado', 'Sin descargar'],
      },
    },
  },
}

export default richTable
