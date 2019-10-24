import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/admin/AppLayout'
import AuthLayout from '../components/auth/AuthLayout'
import lazyLoading from './lazyLoading'

Vue.use(Router)

const demoRoutes = []
if (process.env.NODE_ENV === 'development') {
  const VueBook = require('vue-book')

  demoRoutes.push(
    VueBook.createRoute({
      requireContext: require.context('./..', true, /.demo.vue$/),
      path: '/demo',
    }),
    VueBook.createRoute({
      requireContext: require.context('./../components', true, /.vue$/),
      path: '/presentation',
    }),
  )

  Vue.use(VueBook.VueBookComponents)
}

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

export default new Router({
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'home' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: lazyLoading('auth/login/Login'),
        },
        {
          name: 'signup',
          path: 'signup',
          component: lazyLoading('auth/signup/Signup'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },
    {
      path: '/404',
      component: EmptyParentComponent,
      children: [
        {
          name: 'not-found-advanced',
          path: 'not-found-advanced',
          component: lazyLoading('pages/404-pages/VuesticPageNotFoundSearch'),
        },
        {
          name: 'not-found-simple',
          path: 'not-found-simple',
          component: lazyLoading('pages/404-pages/VuesticPageNotFoundSimple'),
        },
        {
          name: 'not-found-custom',
          path: 'not-found-custom',
          component: lazyLoading('pages/404-pages/VuesticPageNotFoundCustom'),
        },
        {
          name: 'not-found-large-text',
          path: '/pages/not-found-large-text',
          component: lazyLoading('pages/404-pages/VuesticPageNotFoundLargeText'),
        },
      ],
    },
    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'home',
          path: 'home',
          component: lazyLoading('self-components/home/Home'),
          default: true,
        },
        {
          name: 'rich-table',
          path: 'rich-table',
          component: lazyLoading('app-sidebar-entries/rich-table/RichTable'),
          default: true,
        },
        {
          name: 'reuniones',
          path: 'reuniones',
          component: lazyLoading('ReunionVideoConferencia/Reunion'),
        },
        {
          name: 'ocurrencia',
          path: 'reuniones/:reunionId/ocurrencias',
          component: lazyLoading('ReunionVideoConferencia/Ocurrencia'),
        },
        {
          name: 'grabacion',
          path: 'reuniones/:reunionId/ocurrencias/:ocurrenciaId/grabaciones',
          component: lazyLoading('ReunionVideoConferencia/Grabacion'),
        },
        {
          name: 'archivo',
          path: 'reuniones/:reunionId/ocurrencias/:ocurrenciaId/grabaciones/:grabacionId/archivos',
          component: lazyLoading('ReunionVideoConferencia/Archivo'),
        },{
          name: 'curaduria',
          path: 'form-generator',
          component: lazyLoading('FormGenerator/Formulario'),
        },{
          name: 'respuestas',
          path: 'respuestas',
          component: lazyLoading('FormGenerator/Respuestas'),
        },{
          name: 'table_respuestas',
          path: 'table_respuestas',
          component: lazyLoading('FormGenerator/TableRespuestas'),
        },
      ],
    },
  ],
})
