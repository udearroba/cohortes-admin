<template>
<vuestic-widget :headerText="headerTextComputed">
  <form>
    <div class="va-row">
      <div class="flex md8">
        <fieldset>
          <template
          v-for="(value, name) in formModel">
            <div class="form-group with-icon-left" v-bind:key="name">
              <template v-if="value.type == '_Date'">
                <div class="input-group date-input">
                    <div class="input-group">
                      <vuestic-date-picker
                        id=model[name]
                        :config="configPicker"
                        v-model="model[name]"
                      />
                      <i v-bind:class="value.icon"
                      class="icon-left input-icon"></i>
                      <label class="control-label" for=model[name]>
                        {{ value.alias }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>
              </template>
              <template v-else-if="value.type == 'Duration'">
                <div class="input-group date-input">
                    <div class="input-group">
                      <vuestic-date-picker
                        id=model[name]
                        :config="configDurationPicker"
                        v-model="model[name]"
                      />
                      <i v-bind:class="value.icon"
                      class="icon-left input-icon"></i>
                      <label class="control-label" for=model[name]>
                        {{ value.alias }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>
              </template>
              <template v-else>
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
    },
    parentData: {
      type: Object,
      required: false,
    },
  },
  data () {
    return {
      model: {},
      formModel: {},
      foreignKeys: {},
      configPicker: {
        locale: 'es',
        altInput: true,
        altFormat: 'd M Y h:i K',
        dateFormat: 'd M Y h:i K',
        allowInput: true,
        enableTime: true,
        },
      configDurationPicker: {
        noCalendar: true,
        time_24hr: true,
        altInput: true,
        altFormat: 'H:i:S',
        dateFormat: 'H:i:S',
        maxTime: '10:00',
        defaultHour: '1',
        enableSeconds: true,
        allowInput: true,
        enableTime: true,
        },
    }
  },
  methods: {
    onAgregar() {
      let rawModel = this.model
      let validatedModel = validatorService.checkValid(rawModel, this.entityModel)

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
    clearForm() {
      for (let key in this.model) {
        let type = this.entityModel[key].type
        if (type == "_Date") {
          let dateFilter = this.$options.filters.date
          let initialValue = dateFilter(new Date())
          this.model[key] = initialValue
        }
        else if (type == "Duration") {
          let dateFilter = this.$options.filters.date
          let initialValue = dateFilter(new Date())
          this.model[key] = '1:30:00'
        } else {
          this.model[key] = ''
        }
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
  watch: {
    parentData() {
      // aquí solo se asignan los valores iniciales DINÁMICOS basados en los datos del modelo anterior
      for (let modelAttr in this.entityModel) {
        if(this.entityModel[modelAttr].initialState){
          let initialStateObject = this.entityModel[modelAttr].initialState
          let initialValue = '';
          if (Object.keys(initialStateObject)[0] === "prev") {
            let prevValue = initialStateObject['prev']
            initialValue = this.parentData[prevValue]
          }
          Vue.set(this.model, modelAttr, initialValue);
        }
      }
    },
  },
  created() {
    // Aquí se procesa el modelo para transformalo.
    // Se separan los campos necesarios para el formulario final y las llaves foráneas
    for (let modelAttr in this.entityModel) {

      // Se mira si hay datos que inician con un valor solicitado...
      // este valor puede ser estático o dinámico...
      // aquí solo se asignan los valores iniciales ESTÁTICOS


      /*
      if(this.entityModel[modelAttr].initialState){
        let initialValue = '';
        for (let [key, value] of Object.entries(this.entityModel[modelAttr].initialState)) {
          if(typeof value === "object") {
            let initialStateObject = value
            if (Object.keys(initialStateObject)[0] === "auto") {
              let autoValue = initialStateObject['auto'];
              if (Object.keys(autoValue)[0] != "prev") {
                // si 'autoValue' NO es 'prev' quiere decir que el valor automático de este campo es estático...
                // puesto que no requiere de valores previos. Puede ser asignado aquí.
              }
            }
          }
          if(typeof value === "string") {

          }
          Vue.set(this.model, modelAttr, initialValue);
        }
      }
      */



      //los campos necesarios en el formulario tienen un campo requiredOnForm = true
      if(this.entityModel[modelAttr].requiredOnForm) {
        this.formModel[modelAttr] = this.entityModel[modelAttr]
        Vue.set(this.model, modelAttr, null);

        //a los campos tipo '_Date' se les asigna automáticamente la fecha actual
        if (this.entityModel[modelAttr].type == "_Date") {
          let dateFilter = this.$options.filters.date
          let initialDate = dateFilter(new Date())
          Vue.set(this.model, modelAttr, initialDate);
        }
        //a los campos tipo 'Duration' se les asigna automáticamente un valor inicial de una hora y media
        else if (this.entityModel[modelAttr].type == "Duration") {
          let dateFilter = this.$options.filters.date
          let initialDate = dateFilter(new Date())
          Vue.set(this.model, modelAttr, "1:30:00");
        }
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
