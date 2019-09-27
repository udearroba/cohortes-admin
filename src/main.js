// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import VuesticPlugin from '@/vuestic-theme/vuestic-plugin'
import './i18n'
import YmapPlugin from 'vue-yandex-maps'
import DateFilter from './filters/date.filter'
import DurationFilter from './filters/duration.filter'
import WeightFilter from './filters/fileWeight.filter'


//Vue form-generator
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'

//Vue field matrix import
import VfgFieldMatrix from 'vfg-field-matrix'
Vue.component("field-matrix", VfgFieldMatrix);


Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)

//use Vue form-geenrator
Vue.use(VueFormGenerator)

//Vue field matrix use
Vue.use(VfgFieldMatrix)

Vue.filter('date', DateFilter)
Vue.filter('duration', DurationFilter)
Vue.filter('weight', WeightFilter)

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, { fieldsBagName: 'formFields' })

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  store.commit('setLoading', false)
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
