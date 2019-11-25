const richTable =  {
  fields: {
    reunion: {
      idsistemaexterno: {
        title: 'Id sistema externo'
      },
    },
    grabacion: {
      id: {
        title: 'Id'
      },
      playurl: {
        title: 'Play URL',
        format: 'link',
      },
      mesOcurrencia: {
        title: 'Mes de ocurrencia',
      },
      estadoDescarga: true,
    },
    ocurrencia: {
      starttime: {
        title: 'Fecha de inicio',
      },
    },
    archivo: {
      idexterno: {
        title: 'Id externo',
      },
      formato: {
        title: 'Formato',
      },
      url: {
        title: 'Url',
        format: 'link',
      },
      estadoDescarga: true,
    },
  },
}

export default richTable
