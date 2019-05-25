const GrabacionModel =  {
  idexterno: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-key',
  },
  ocurrenciaId: {
    requiredOnForm: false,
    type: 'Number',
    foreignKey: true,
  },
  playurl: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-play-circle',
  },
  duracion: {
    requiredOnForm: true,
    type: 'Number',
    icon: 'fa fa-hourglass-3',
  },
}

export default GrabacionModel
