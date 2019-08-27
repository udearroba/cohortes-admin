const FormularioModel =  {
    id: {
      type: 'Number',
      finalCondition: ['no-dash'],
      icon: 'fa fa-key',
      alias: 'Id',
      isTableField: true,
    },
    nombre: {
      requiredOnForm: true,
      type: 'String',
      icon: 'fa fa-edit',
      alias: 'Nombre Formulario',
      isTableField: true,
    },
     json: {
      requiredOnForm: true,
      type: 'String',
      charLimit: 2147483647,
      finalCondition: ['no-dash'],
      icon: 'fa fa-code',
      alias: 'Json',
      isTableField: false,
    },
    _metadata: {
      requiredOnForm: false,
      alias: 'Formularios'
    }
  }
  
  export default FormularioModel
  