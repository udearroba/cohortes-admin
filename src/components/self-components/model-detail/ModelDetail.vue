<template>
  <div>
    <template
    v-for="(value, name) in model">
      <div class="detalle-item" v-bind:key="name">
        <i
          v-bind:class="value.icon"
          class="info-icon">
        </i>
        <span class="value">{{value.alias}}:</span>
         <span>{{dataComputed[name]}}</span>
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
  computed: {
    dataComputed(){
      let _dataComputed = _.clone(this.entityData)

      //Aquí se hacen los filtros o procesos necesarios a los datos antes de mostrarlos
      for (let [key, value] of Object.entries(_dataComputed)) {
          let modelAttr = this.model[key]
          if(!modelAttr){
            continue
          }
          let modelAttr_type = this.model[key].type
          let filters = this.$options.filters
          if(modelAttr_type === "_Date") {
            let dateFilter = filters.date
            _dataComputed[key] = dateFilter(value)
          } else {
            _dataComputed[key] = value
          }
      }
      return _dataComputed
    }
  }
}
</script>

<style lang="scss">
  span.value {
    font-weight: bold;
    color: $darkest-gray;
  }
</style>
