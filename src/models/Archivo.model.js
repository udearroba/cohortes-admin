const ArchivoModel =  {
  grabacionId: {
    requiredOnForm: false,
    type: 'Number',
    foreignKey: true,
    alias: 'grabacionId',
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
  formato: {
    requiredOnForm: true,
    type: 'String',
    icon: 'fa fa-file-o',
    alias: 'Formato',
    isTableField: true,
  },
  url: {
    requiredOnForm: true,
    type: 'String',
    charLimit: 512,
    icon: 'fa fa-link',
    alias: 'Url',
    isTableField: true,
  },
  pesobyte: {
    requiredOnForm: true,
    isNullable: true,
    type: 'ByteWeight',
    icon: 'fa fa-files-o',
    alias: 'Peso',
    isTableField: true,
  },
  _metadata: {
    requiredOnForm: false,
    alias: 'Archivo'
  }
}

export default ArchivoModel
