export const breadcrumbs = {
  root: {
    name: '/',
    displayName: 'Home',
  },
  routes: [
    {
      name: 'home',
      displayName: 'Welcome',
    },{
      name: 'reuniones',
      displayName: 'reuniones',
      children: [
        {
          name: 'ocurrencia',
          displayName: 'ocurrencias',
          children: [
            {
              name: 'grabacion',
              displayName: 'grabaciones',
              children: [
                {
                  name: 'archivo',
                  displayName: 'archivos',
                },
              ]
            },
          ]
        },

      ],
    },{
      name: 'rich-table',
      displayName: 'Rich Table',
    },{
      name: 'curaduria',
      displayName: 'curaduria',
      children: [
        {
          name: 'respuestas',
          displayName: 'Formulario',
        },{
          name: 'table_respuestas',
          displayName: 'Respuestas Diligenciadas',
        },

      ],
    },
  ],
}
