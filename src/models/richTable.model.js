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
      estadodescarga: {
        alias: 'Almacenado en',
        needed: true,
        format: 'status',
        status: ['ZOOM', 'DRIVE'],
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
      estadodescarga: {
        alias: 'Estado descarga de archivo',
        needed: true,
        format: 'status',
        status: ['DESCARGADO', 'SIN DESCARGAR'],
      },
    },
  },
}

export default richTable
