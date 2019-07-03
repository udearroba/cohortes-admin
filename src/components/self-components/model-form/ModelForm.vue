<template>
<vuestic-widget :headerText="headerTextComputed">
  <form>
    <div class="va-row">
      <div class="flex md8">
        <fieldset>
          <template
          v-for="(value, name) in formModel">
            <div class="form-group with-icon-left" v-bind:key="name">
              <template>
                <div class="input-group">
                  <input
                  :name = "name"
                  v-model = "model[name]"
                  :type = "value.type"
                  required/>
                  <i v-bind:class="value.icon"
                  class="icon-left input-icon"></i>
                  <label class="control-label" :for="name">
                    {{ value.alias }}
                  </label><i class="bar"></i>
                </div>
              </template>
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
</vuestic-widget>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'

import validatorService from '../../../services/validator'

export default {
  name: 'model-form',
  props: {
    entityModel: {
      type: Object,
      required: true,
    },
    foreignKey: {
      type: [Number, String],
      required: false,
    },
    headerText: {
      type: String,
      required: false,
    }
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

      let validatedModel = validatorService.checkValid(this.model, this.entityModel)

      // si el modelo no es válido, entonces no se sigue con el proceso
      if (!validatedModel.isValid) {
        this.$emit('on-agregar', validatedModel)
        return false;
      }

      let finalModel = validatedModel.model

      // se agregan las llaves primarias al modelo
      for (let foreignKeyElement in this.foreignKeys) {
        finalModel[foreignKeyElement] = this.foreignKeys[foreignKeyElement]
      }

      validatedModel.model = finalModel
      this.$emit('on-agregar', validatedModel)
    },
    durationToSeconds(duration) {
      // RegEx extraído de stackoverflow.com
          // con título Regex pattern for HH:MM:SS time string
          // El RegEx fue modificado
          let pattern =
            /^(?:(?:(\d+):)?([0-5]?\d):)?([0-5]?\d)$/

          var patternGroups = duration.match(pattern)
          if(!patternGroups)
            return null
          let hours = patternGroups[1]
          let minutes = patternGroups[2]
          let seconds = patternGroups[3]
          hours = hours ? +hours : 0
          minutes = minutes ? +minutes : 0
          seconds = +seconds

          return hours*60*60 + minutes*60 + seconds
    },
    clearForm() {
      for (let key in this.model) {
        this.model[key] = ''
      }
    },
  },
  computed: {
    headerTextComputed(){
      let headerTextProp =this.$props.headerText
      if (headerTextProp)
        return headerTextProp
      return 'Agregar ' + this.entityModel._metadata.alias
    }
  },
  created() {
    // Aquí se procesa el modelo para transformalo.
    // Se separan los campos necesarios para el formulario final y las llaves foráneas
    for (let modelAttr in this.entityModel) {
      //los campos necesarios en el formulario tienen un campo requiredOnForm = true
      if(this.entityModel[modelAttr].requiredOnForm) {
        this.formModel[modelAttr] = this.entityModel[modelAttr]
        Vue.set(this.model, modelAttr, null);
      }
      //los campos que son llaves foráneas tienen un campo foreignKey = true
      if(this.entityModel[modelAttr].foreignKey) {
        this.foreignKeys[modelAttr] = +this.foreignKey
      }
    }
  },
}
</script>

<style lang="scss">
.input-calendar {
  display: none !important;
}
.wrapper-calendar {
  span i {
    color: $text-gray;
  }
}
</style>
