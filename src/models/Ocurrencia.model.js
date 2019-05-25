const OcurrenciaModel =  {
  reunionvideoconferenciaId: {
    requiredOnForm: false,
    type: 'Number',
    foreignKey: true,
    alias: 'reunionId',
  },
  idexterno: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-key',
    alias: 'Id externo',
  },
  starttime: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-clock-o',
    alias: 'Fecha de inicio',
  },
  duracion: {
    requiredOnForm: true,
    type: 'Number',
    icon: 'fa fa-hourglass-3',
    alias: 'Duración',
  },
  status: {
    requiredOnForm: true,
    type: 'Number',
    icon: 'fa fa-check-square',
    alias: 'Estado',
  },
}

export default OcurrenciaModel
