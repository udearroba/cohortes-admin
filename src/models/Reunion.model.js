const ReunionModel =  {
  uuid: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-key',
    alias: 'Uuid',
  },
  idsistemaexterno: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-key',
    alias: 'Id sistema externo',
  },
  urljoin: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-link',
    alias: 'URL join',
  },
  urlstart: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-link',
    alias: 'URL start',
  },
  hostid: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-id-card',
    alias: 'Host id',
  },
  createdat: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-calendar-o',
    alias: 'Fecha de creación',
  },
  nombre: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-paperclip',
    alias: 'Nombre',
  },
}

export default ReunionModel
