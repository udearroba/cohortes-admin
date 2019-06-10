<template>
  <vuestic-modal ref="edit_modal"
                   v-on:ok="onGuardarCambios"
                   :ok-class="'btn btn-success btn-micro'"
                   :cancel-class="'btn btn-pale btn-micro'"
                   :close-icon-shown="false"
                   :okText="'Guardar cambios' | translate"
                   :cancelText="'Cancelar' | translate">
      <div slot="title">Editar</div>
      <div>
        <form>
          <div class="va-row">
            <div class="flex md8">
              <fieldset>
                <template v-for="(value, name) in model">
                  <div class="form-group with-icon-left" v-bind:key="name">
                    <div class="input-group">
                      <input
                      id="input-icon-left"
                      :name = "name"
                      :type = "entityModel[name].type"
                      v-model = "model[name]"
                      :number="entityModel[name].type == 'Number'"
                      required/>
                      <i
                        v-bind:class="entityModel[name].icon"
                        class="icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{name}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                </template>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </vuestic-modal>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'

export default {
  name: 'edit-modal',
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
    onGuardarCambios() {
      let returnedModel = _.clone(this.entityData)
      for (let modelItem in this.model) {
        returnedModel[modelItem] = this.model[modelItem]
        //los datos tipo Number deben ser casteados. Por defecto se agregan al modelo datos tipo String
        if(this.entityModel[modelItem].type === "Number") {
          returnedModel[modelItem] = +returnedModel[modelItem]
        }
    }
      this.$emit('cambios-guardados', returnedModel)
    },
  },
  watch: {
    entityData() {
      // actualiza this.$data.model
      for (let modelAttr in this.model) {
        this.model[modelAttr] = this.entityData[modelAttr]
      }
    }
  },
  created() {
    for (let modelAttr in this.entityModel) {
      // se agregan los atributos necesarios this.$data.model
      // de forma que queden reactivos
      if(this.entityModel[modelAttr].requiredOnForm) {
        Vue.set(this.model, modelAttr, '');
      }
    }
  },
  mounted () {
    this.$emit('initialized', this.$refs.edit_modal)
  },
}
</script>

<style lang="scss">
</style>
