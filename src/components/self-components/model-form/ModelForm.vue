<template>
<vuestic-widget :headerText="headerTextComputed">
  <form>
    <div class="va-row">
      <div class="flex md8">
        <fieldset>
          <template
          v-for="(value, name) in formModel">
            <div class="form-group with-icon-left" v-bind:key="name">
              <template v-if="value.type == 'UnixTime'">
                <div class="input-group date-input">
                    <div class="input-group">
                      <vuestic-date-picker
                        id=model[name]
                        :config="configPicker"
                        v-model="model[name]"
                        @blur="blurDatePickerMethod(name, $event)"
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
                        @blur="blurDurationPickerMethod(name, $event)"
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
                  @blur="blurInput(name)"
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

          <div class="action-buttons">
            <div class="btn btn-micro btn-primary"
            @click="onAgregar">
              {{'Agregar'}}
            </div>
            <div class="btn btn-micro btn-primary"
            v-if="!noLinkAction"
            @click="onAgregarAndContinue">
              {{'Agregar y continuar'}}
            </div>
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

import Validator from '../../../services/validator.class'
import FormValidator from '../../../services/formValidator.class'
import Transformer from '../../../services/transformer.class'
import UserExceptionHandler from '../../../services/userExceptionHandler.class'

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
    noLinkAction: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
  },
  data () {
    return {
      model: {},
      formModel: {},
      foreignKeys: {},
      initialDinamicValues: [],
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
    blurDatePickerMethod(name, value) {
      let pattern =
        /^((\d{1,2})\s([a-zA-Z]{3})\s(\d+))\s((\d{1,2}):(\d{2})\s?([AaPp][Mm]))$/

      let patternMatch = value.match(pattern)

      if (!patternMatch) {
        this.model[name] = new Date()
        return
      }

      let month = patternMatch[3]
      let newMonth = _.capitalize(month)
      let newDate = value.replace(month, newMonth)
      this.model[name] = newDate
      this.blurInput(name)
    },
    blurDurationPickerMethod(name, value) {
      let pattern =
        /^(?:(?:(\d+):)?([0-5]?\d):)?([0-5]?\d)$/

      let patternMatch = value.match(pattern)
      let newValue = value

      if (!patternMatch) {
        newValue = '01:30'
      }

      this.model[name] = newValue
      this.blurInput(name)
    },
    blurInput(name) {
      let value = this.model[name]
      let model = this.entityModel[name]
      this.model[name] = Transformer.validateByModel(value, model)
    },
    onAgregar() {
      let finalModel = this.addData()
      this.$emit('on-agregar', finalModel)
    },
    onAgregarAndContinue() {
      let finalModel = this.addData()
      this.$emit('on-agregar-and-continue', finalModel)
    },
    clearForm() {
      for (let key in this.model) {
        let type = this.entityModel[key].type
        if (type == "UnixTime") {
          let dateFilter = this.$options.filters.date
          let initialValue = new Date()
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
      this.setInitialState()
    },
    setInitialState() {
      for (let modelAttr in this.entityModel) {
        if(this.entityModel[modelAttr].initialState){
          let initialStateObject = this.entityModel[modelAttr].initialState
          let initialValue = '';
          if (Object.keys(initialStateObject)[0] === "static") {
            initialValue = initialStateObject['static']
            Vue.set(this.model, modelAttr, initialValue)
          }
          else if (Object.keys(initialStateObject)[0] === "dynamic") {
            initialValue = initialStateObject['dynamic']
            //se asigna un 'watcher' a la propiedad necesaria
            this.$watch('model.' + initialValue, function(newValue) {
              this.model[modelAttr] = newValue
            });
          }
          else if (Object.keys(initialStateObject)[0] === "static-plus") {
            let static_plus = initialStateObject['static-plus']

            //se asigna un 'watcher' a la propiedad necesaria
            let staticValue = static_plus.static
            let plusValue = static_plus.plus
            this.$watch('model.' + plusValue, function(newPlusValue) {
              let newAttrValue = staticValue + newPlusValue
              this.model[modelAttr] = newAttrValue
            });
          }
          for (let index = 0; index < this.initialDinamicValues.length; index++) {
            let initialValue = this.initialDinamicValues[index]
            Vue.set(this.model, initialValue.attr, initialValue.initialValue)
          }
        }
      }
    },
    addData() {
      let rawModel = this.model
      let fValidator = new FormValidator(rawModel, this.entityModel)
      let validatedModel = {}
      try {
        validatedModel = fValidator.validateForm()
      } catch (error) {
        validatedModel.isValid = false
        validatedModel.message = UserExceptionHandler.getUserError(error)
      }

      // si el modelo no es válido, entonces no se sigue con el proceso
      if (!validatedModel.isValid) {
        return validatedModel;
      }

      let finalModel = validatedModel.model

      // se agregan las llaves primarias al modelo
      for (let foreignKeyElement in this.foreignKeys) {
        finalModel[foreignKeyElement] = this.foreignKeys[foreignKeyElement]
      }

      validatedModel.model = finalModel
      return validatedModel
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
      // Se mira si hay datos que inician con un valor solicitado...
      // este valor puede ser estático o dinámico...
      for (let modelAttr in this.entityModel) {
        if(this.entityModel[modelAttr].initialState){
          let initialStateObject = this.entityModel[modelAttr].initialState
          let initialValue = '';
          if (Object.keys(initialStateObject)[0] === "prev") {
            let prevValue = initialStateObject['prev']
            initialValue = this.parentData[prevValue]
            this.initialDinamicValues.push({attr: modelAttr, initialValue: initialValue})
            Vue.set(this.model, modelAttr, initialValue);
          }
        }
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
        Vue.set(this.model, modelAttr, null);

        //a los campos tipo 'UnixTime' se les asigna automáticamente la fecha actual
        if (this.entityModel[modelAttr].type == "UnixTime") {
          let dateFilter = this.$options.filters.date
          let initialDate = new Date()
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
    this.setInitialState()
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
.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  div:nth-child(2) {
    margin-top: 5px;
    white-space: nowrap;
  }
}
</style>
