const ReunionModel =  {
  uuid: {
    requiredOnForm: true,
    type: 'String',
    finalCondition: ['no-dash'],
    icon: 'fa fa-key',
    alias: 'Uuid',
  },
  idsistemaexterno: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 100,
    finalCondition: ['no-dash'],
    icon: 'fa fa-key',
    alias: 'Id sistema externo',
    isTableField: true,
  },
  urljoin: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 512,
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
  createdat: {
    requiredOnForm: true,
    type: '_Date',
    icon: 'fa fa-calendar-o',
    alias: 'Fecha de creación',
    isTableField: true,
  },
  nombre: {
    requiredOnForm: true,
    type: 'String',
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
