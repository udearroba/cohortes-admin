<template>
  <div class="link-element-content">
    <div class="content-title" @click="focusField()">
      {{title}}
      <i class="fa fa-edit"></i>
    </div>
    <div class="content-info">
      <a
        :href="contentInfo"
        target="_blank"
        v-show="!inputActive"
        >
      {{contentInfo}}
      </a>
      <input
        ref="input"
        v-model="editField"
        v-show="inputActive"
        @blur="blurField"
        @focus="$event.target.select()"
        @keypress="enterPressed($event)">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiRoutes from '../../../../../services/apiRoutes'

export default {
  name: 'link-element-content',
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      contentInfo: this.data.info,
      inputActive: false,
      editField : '',
    }
  },
  methods: {
    focusField(){
      this.editField = this.contentInfo
      this.inputActive = !this.inputActive
      this.$nextTick(() => {
      this.$refs.input.focus()
      })
    },
    blurField(){
      let newValue = this.editField.trim()
      if(this.contentInfo != newValue) {
        this.saveChanges(newValue)
      }
      this.inputActive = !this.inputActive
    },
    enterPressed(event) {
      if (event.keyCode === 13) {
        event.path[0].blur()
      }
    },
    saveChanges(newValue) {
      let newRegister = _.cloneDeep(this.data.id.register)
      newRegister[this.data.title] = newValue

      let routePath = ''
      if (this.data.id.field == 'archivo') {
        routePath = apiRoutes.archivosRoute
      } else if (this.data.id.field == 'grabacion') {
        routePath = apiRoutes.grabacionesRoute
      }

      axios.patch(routePath, newRegister)
      .then(res => {
        this.contentInfo = newValue
        this.showSuccessToast('Cambios guardados correctamente')
      }).catch(error => {
        console.log(error)
        console.error('Verificar que la ruta a la que se está apuntando en el back es correcta')
        this.showErrorToast()
      })
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
