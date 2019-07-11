const GrabacionModel =  {
  ocurrenciaId: {
    requiredOnForm: false,
    type: 'Number',
    foreignKey: true,
    alias: 'ocurrenciaId',
  },
  idexterno: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 100,
    finalState: ['no-dash'],
    icon: 'fa fa-key',
    alias: 'Id externo',
    isTableField:true,
  },
  playurl: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 512,
    icon: 'fa fa-play-circle',
    alias: 'Play URL',
    isTableField:true,
  },
  duracion: {
    requiredOnForm: true,
    isNullable: true,
    type: 'Duration',
    icon: 'fa fa-hourglass-3',
    alias: 'Duración',
    isTableField:true,
  },
  _metadata: {
    requiredOnForm: false,
    alias: 'Grabación'
  }
}

export default GrabacionModel
