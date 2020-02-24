<template>
  <div class="status-element-content">
    <div class="content-title" @click="onClick()">
      {{title}}
      <i class="fa fa-exchange"></i>
    </div>
    <div class="content-info">
      {{contentInfo}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiRoutes from '../../../../../services/apiRoutes'

export default {
  name: 'status-element-content',
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      contentInfo: this.data.info
    }
  },
  methods: {
    onClick() {
      const actualIndex = _.indexOf(this.data.extra.status, this.contentInfo)
      let newContentInfo = this.getNextElement(this.data.extra.status, actualIndex)

      let newRegister = _.cloneDeep(this.data.id.register)
      newRegister[this.data.title] = newContentInfo

      let routePath = ''
      if (this.data.id.field == 'archivo') {
        routePath = apiRoutes.archivosRoute
      } else if (this.data.id.field == 'grabacion') {
        routePath = apiRoutes.grabacionesRoute
      }
      
      routePath = `${routePath}/${this.data.id.register.id}`

      axios.patch(routePath, newRegister)
      .then(res => {
        this.contentInfo = this.getNextElement(this.data.extra.status, actualIndex)
        this.showSuccessToast('Cambios guardados correctamente')
      }).catch(error => {
        console.log(error)
        console.error('Verificar que la ruta a la que se está apuntando en el back es correcta')
        this.showErrorToast()
      })
    },
    getNextElement(arr, actualIndex) {
      const len = arr.length
      if (actualIndex+1 >= len)
        return arr[0]
      return arr[actualIndex+1]
    }
  },
  computed: {
    dataType() {
      if (!this.data.extra) {
        return null
      }
      return this.data.extra.format
    },
    title() {
      if (this.data.extra) {
        return this.data.extra.alias ? this.data.extra.alias : this.data.title
      }
      return this.data.title
    }
  },
}
</script>

<style lang="scss" scoped>

$content-title-color: $vue-green;
$content-info-color: $lighter-gray;

  .content-title {
    display: flex;
    justify-content: flex-start;
    color: $content-title-color;
    font-weight: bold;
    i {
      display: none;
      margin-left: auto;
      align-self: center;
    }
    &:hover {
      cursor: pointer;
      & i {
      display: initial;
      }
    }
  }

  .content-info {
    color: $content-info-color;
    align-self: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 94px;
  }
</style>
