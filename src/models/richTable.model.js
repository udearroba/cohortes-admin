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
      estadoDescarga: true,
    },
    ocurrencia: {
      starttime: {
        title: 'Fecha de inicio',
      },
      mesOcurrencia: {
        title: 'Mes de ocurrencia',
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
