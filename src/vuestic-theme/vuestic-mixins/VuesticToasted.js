import Toasted from 'vue-toasted'
import Vue from 'vue'

const toastOptions = {
  theme: 'none',
  position: 'bottom-center',
  className: 'vuestic-toast',
  iconPack: 'fontawesome',
  duration: 2500,
}

const errorToast = {
  icon: 'null',
  position: 'bottom-right',
  duration: 1300,
  containerClass: 'toast-error'
}

const dangerToast = {
  icon: 'fa-trash',
  position: 'bottom-right',
  duration: 1300,
  containerClass: 'toast-deleted'
}

const addedToast = {
  icon: 'fa-plus',
  position: 'bottom-right',
  duration: 1300,
  containerClass: 'toast-added'
}

const successToast = {
  icon: 'fa-check',
  position: 'bottom-right',
  duration: 1300,
  containerClass: 'toast-added'
}

Vue.use(Toasted, toastOptions)

export default {
  methods: {
    showToast (msg, options) {
      this.$toasted.show(msg, options)
    },
    showDeletedToast (msg, options) {
      this.$toasted.show(msg || `Datos eliminados`, options || dangerToast)
    },
    showAddedToast (msg, options) {
      this.$toasted.show(msg || `Datos agregados`, options || addedToast)
    },
    showErrorToast (msg, options, long) {
      if(long) {
        errorToast.duration = 5500
      }
      this.$toasted.show(msg || `Fallo en la operación`, options || errorToast)
    },
    showSuccessToast (msg, icon, options) {
      if (icon){
        successToast.icon = icon
      }
      this.$toasted.show(msg || `Oparación exitosa`, options || successToast)
    },
  },
}
