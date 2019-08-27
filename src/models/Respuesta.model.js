const RespuestaModel =  {
    id: {
      type: 'Number',
      finalCondition: ['no-dash'],
      icon: 'fa fa-key',
      alias: 'Id',
    },
    respuestas: {
      requiredOnForm: true,
      type: 'String',
      charLimit: 512,
      finalCondition: ['no-dash'],
      icon: 'fa fa-key',
      alias: 'Respuestas',
      isTableField: false,
    },
    formularioId: {
      type: 'Number',
      foreignKey: true,
      icon: 'fa fa-link',
      alias: 'Id Formulario',
      isTableField: true,
    },
    fechaHora: {
      type: '_Date',
      icon: 'fa fa-link',
      alias: 'URL start',
      isTableField: true,
    },
    _metadata: {
      requiredOnForm: false,
      alias: 'Respuestas'
    }
  }
  
  export default RespuestaModel
  