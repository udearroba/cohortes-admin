const OcurrenciaModel = {
  reunionvideoconferenciaId: {
    requiredOnForm: false,
    type: 'Number',
    foreignKey: true,
    alias: 'reunionId',
  },
  idexterno: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 100,
    finalState: ['no-dash'],
    icon: 'fa fa-key',
    alias: 'Id externo',
    isTableField: true,
  },
  starttime: {
    requiredOnForm: true,
    type: '_Date',
    icon: 'fa fa-clock-o',
    alias: 'Fecha de inicio',
    isTableField: true,
  },
  duracion: {
    requiredOnForm: true,
    type: 'Duration',
    icon: 'fa fa-hourglass-3',
    alias: 'Duración',
    isTableField: true,
  },
  status: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 45,
    icon: 'fa fa-check-square',
    alias: 'Estado',
    isTableField: true,
  },
  _metadata: {
    requiredOnForm: false,
    alias: 'Ocurrencia'
  }
}

export default OcurrenciaModel
