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
    icon: 'fa fa-key',
    alias: 'Id externo',
  },
  playurl: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-play-circle',
    alias: 'Play URL',
  },
  duracion: {
    requiredOnForm: true,
    type: 'Number',
    icon: 'fa fa-hourglass-3',
    alias: 'Duración',
  },
  _metadata: {
    requiredOnForm: false,
    alias: 'Grabación'
  }
}

export default GrabacionModel
