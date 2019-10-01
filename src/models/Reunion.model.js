const ReunionModel =  {
  uuid: {
    requiredOnForm: true,
    type: 'String',
    finalState: ['no-dash'],
    icon: 'fa fa-key',
    alias: 'Uuid',
  },
  idsistemaexterno: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 100,
    initialState: {
      'dynamic': 'uuid'
    },
    finalState: ['no-dash'],
    icon: 'fa fa-key',
    alias: 'Id sistema externo',
    isTableField: true,
  },
  urljoin: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 512,
    initialState:
    {
      'static-plus': {
        static: 'https://udearroba.zoom.us/j/',
        plus: 'uuid',
      }
    },
    icon: 'fa fa-link',
    alias: 'URL join',
  },
  urlstart: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 512,
    icon: 'fa fa-link',
    alias: 'URL start',
    isTableField: true,
  },
  hostid: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-id-card',
    alias: 'Host id',
  },
  createdate: {
    requiredOnForm: true,
    isNullable: true,
    type: 'UnixTime',
    icon: 'fa fa-calendar-o',
    alias: 'Fecha de creación',
    isTableField: true,
  },
  nombre: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 128,
    icon: 'fa fa-paperclip',
    alias: 'Nombre',
    isTableField: true,
  },
  _metadata: {
    requiredOnForm: false,
    alias: 'Reunion'
  }
}

export default ReunionModel
