<template>
  <vuestic-modal ref="detail_modal"
                :no-buttons="true"
                v-bind:small="true">
      <div slot="title">Detalles</div>
      <div>
        <ul class="detail-list">
          <li v-for="(value, name) in model" v-bind:key="name">
            <span class="detail-item-title">{{name}}:</span>
            {{entityData[name]}}
          </li>
        </ul>
      </div>
    </vuestic-modal>
</template>

<script>
export default {
  name: 'detail-modal',
  props: {
    entityModel: {
      type: Object,
      required: true
    },
    entityData: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      model: {},
    }
  },
  created() {
    // Aquí se procesa el modelo para transformalo.
    // Se separan los campos que van finalmente a mostrarse
    for (let modelAttr in this.entityModel) {
      //los campos que se muestran tienen un campo requiredOnForm = true
      if(this.entityModel[modelAttr].requiredOnForm) {
        this.model[modelAttr] = this.entityData[modelAttr]
      }
    }
  },
  mounted () {
    this.$emit('initialized', this.$refs.detail_modal)
  },
}
</script>

<style lang="scss">
</style>
