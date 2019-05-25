<template>
  <form>
    <div class="va-row">
      <div class="flex md8">
        <fieldset>
          <template
          v-for="(value, name) in formModel">
            <div class="form-group with-icon-left" v-bind:key="name">
              <div class="input-group">
                <input
                :name = "name"
                v-model = "model[name]"
                :type = "value.type"
                required/>
                <i v-bind:class="value.icon"
                class="icon-left input-icon"></i>
                <label class="control-label" :for="name">
                  {{ name }}
                </label><i class="bar"></i>
              </div>
            </div>
          </template>

          <div class="btn btn-micro btn-primary"
          @click="onAgregar">
            {{'Agregar'}}
          </div>
        </fieldset>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'model-form',
  props: {
    entityModel: {
      type: Object,
      required: true
    },
    foreignKey: {
      type: [Number, String],
      required: false
    },
  },
  data () {
    return {
      model: {},
      formModel: {},
      foreignKeys: {},
    }
  },
  methods: {
    onAgregar() {
      for (let modelAttr in this.formModel) {
        //los datos tipo Number deben ser casteados. Por defecto se agregan al modelo datos tipo String
        if(this.entityModel[modelAttr].type === "Number") {
          this.model[modelAttr] = +this.model[modelAttr]
        }
      }

      // se agregan las llaves primarias al modelo
      for (let foreignKeyElement in this.foreignKeys) {
        this.model[foreignKeyElement] = this.foreignKeys[foreignKeyElement]
      }

      let formStatus = {
        isValid: true, //este campo debe ser verificado para cada formulario
        model: this.model
      }
      this.$emit('on-agregar', formStatus)
    },
    clearForm() {
      for (let key in this.model) {
        this.model[key] = ''
      }
    },
  },
  created() {
    // Aquí se procesa el modelo para transformalo.
    // Se separan los campos necesarios para el formulario final y las llaves foráneas
    for (let modelAttr in this.entityModel) {
      //los campos necesarios en el formulario tienen un campo requiredOnForm = true
      if(this.entityModel[modelAttr].requiredOnForm) {
        this.formModel[modelAttr] = this.entityModel[modelAttr]
      }
      //los campos que son llaves primarias tienen un campo foreignKey = true
      if(this.entityModel[modelAttr].foreignKey) {
        this.foreignKeys[modelAttr] = this.foreignKey
      }
    }
  },
}
</script>

<style lang="scss">
</style>
