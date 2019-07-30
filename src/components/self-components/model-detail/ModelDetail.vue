<template>
  <div>
    <template
    v-for="(value, name) in model">
      <div class="detalle-item" v-bind:key="name">
        <i
          v-bind:class="value.icon"
          class="info-icon">
        </i>
        <span><span class="value">{{value.alias}}:</span> {{entityData[name]}}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'model-detail',
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
  methods: {
  },
  created() {
    // Aquí se procesa el modelo para transformalo.
    // Se separan los campos que van finalmente a mostrarse
    // ... y las llaves foráneas (?)
    for (let modelAttr in this.entityModel) {
      //los campos que se muestran tienen un campo requiredOnForm = true
      if(this.entityModel[modelAttr].requiredOnForm) {
        this.model[modelAttr] = this.entityModel[modelAttr]
      }
      //los campos que son llaves primarias tienen un campo foreignKey = true
      // aquí no parece ser necesario tener los datos de la llave foránea
      // if(this.entityModel[modelAttr].foreignKey) {
      //   this.foreignKeys[modelAttr] = this.foreignKey
      // }
    }
  },
}
</script>

<style lang="scss">
  span.value {
    font-weight: bold;
    color: $darkest-gray;
  }
</style>
