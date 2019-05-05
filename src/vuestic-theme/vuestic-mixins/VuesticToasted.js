import Toasted from 'vue-toasted'
import Vue from 'vue'

const toastOptions = {
  theme: 'none',
  position: 'bottom-center',
  className: 'vuestic-toast',
  iconPack: 'fontawesome',
  duration: 2500,
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
  },
}
