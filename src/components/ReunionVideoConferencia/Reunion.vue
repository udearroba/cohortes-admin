<template>
  <div>

    <div class="va-row">
      <!-- FORMULARIO PARA AGREGAR REUNIÓN -->
      <div class="flex md12">
        <model-form ref="modelFormComponent"
        :entityModel="modeloReunion"
        @on-agregar="onAgregar"
        @on-agregar-and-continue="onAgregarAndContinue">
        </model-form>
      </div>
    </div>

    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Reuniones'">
          <model-table
          :tableFields="tableFields"
          :tableData="reuniones"
          :entityModel="modeloReunion"
          @addClicked="onAddClicked"
          @detailsClicked="onDetailsClicked"
          @editClicked="onEditClicked"
          @deleteClicked="onDeleteClicked"
          ></model-table>
        </vuestic-widget>
      </div>
    </div>

    <!-- VENTANAS MODALES -->
    <!-- DETALLES -->
    <details-modal
      :entityModel="modeloReunion"
      :entityData="reunionAux"
      @initialized="handleDetailsModalInitialization"
    ></details-modal>

    <!-- EDICIÓN -->
    <edit-modal
      :entityModel="modeloReunion"
      :entityData="reunionAux"
      @initialized="handleEditModalInitialization"
      @cambios-guardados="onGuardarCambios"
    ></edit-modal>
    <vuestic-modal ref="confirm_modal"
                   v-on:ok="onEliminarConfirmado"
                   v-on:canceled="onEliminarCanceled"
                   :ok-class="'btn btn-danger btn-micro'"
                   :cancel-class="'btn btn-pale btn-micro'"
                   :close-icon-shown="false"
                   :no-header="true"
                   :okText="'Eliminar' | translate"
                   :cancelText="'Cancelar' | translate">
      <div>¿Seguro que desea eliminar el registro?</div>
    </vuestic-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

import ModelForm from '../self-components/model-form/ModelForm'
import ModelTable from '../self-components/model-table/ModelTable'
import DetailsModal from '../self-components/modals/details/DetailsModal'
import EditModal from '../self-components/modals/edit/EditModal'
import apiRoutes from '../../services/apiRoutes'

import DBModels from '../../models/index'


export default {
  name: 'Table',
  components: {
    ModelForm,
    ModelTable,
    DetailsModal,
    EditModal,
  },
  data () {
    return {
      modeloReunion: DBModels.ReunionModel,
      tableFields: [],

      reuniones: {},
      reunion: {},
      reunionAux: {},
      indexDato: '',
    }
  },
  methods: {
    onAgregar (validatedModel) {
      //el componente formulario es quien se encarga de validarlo
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      axios.post(apiRoutes.reunionesRoute, validatedModel.model)
      .then(res => {
        this.$refs.modelFormComponent.clearForm()
        this.reuniones.push(res.data)
        let idGenerado = res.data.id
        this._showAddedToast(idGenerado)
      }).catch(error => {
        console.log(error)
        this.showErrorToast()
      })
    },
    onAgregarAndContinue (validatedModel) {
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      let insert = axios.post(apiRoutes.reunionesRoute, validatedModel.model)
      .then(res => {
        this.$refs.modelFormComponent.clearForm()
        this.reuniones.push(res.data)
        let idGenerado = res.data.id
        this.navegarSiguienteNivel(idGenerado)
      }).catch(error => {
        console.log(error);
        this.showErrorToast()
      })
    },
    onEliminar(index) {
      this.$refs.confirm_modal.open();
      this.indexDato = index;
    },
    onEliminarConfirmado() {
      let idReunion = this.reuniones[this.indexDato].id
      axios.delete(apiRoutes.getReunionesFromId(idReunion))
      .then(res => {
        this.reuniones.splice(this.indexDato,1)
        this.showDeletedToast()
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    },
    onEliminarCanceled() {
      this.indexDato = '';
    },
    navegarSiguienteNivel(id) {
      this.$router.push({ name: 'ocurrencia', params: { reunionId: id }})
    },
    onAddClicked(data, index) {
      this.navegarSiguienteNivel(data.id)
    },
    onDetailsClicked(data, index) {
      this.reunionAux = data
      this.$data.detailsModalRef.open();
    },
    onEditClicked(data, index) {
      this.reunionAux = data
      this.indexDato = index;
      this.$data.editModalRef.open();
    },
    onDeleteClicked(data, index) {
      this.onEliminar(index)
    },
    handleDetailsModalInitialization(detailsModalRef){
      this.$data.detailsModalRef = detailsModalRef
    },
    handleEditModalInitialization(editModalRef){
      this.$data.editModalRef = editModalRef
    },
    onGuardarCambios(validatedModel){
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      let idReunion = this.reuniones[this.indexDato].id
      this.reunionAux = validatedModel
      axios.patch(apiRoutes.getReunionesFromId(idReunion), validatedModel.model)
      .then(res => {
        delete this.reuniones[this.indexDato]
        let newReunion = JSON.parse(JSON.stringify(this.reunionAux))
        newReunion = newReunion.model
        Vue.set(this.reuniones, this.indexDato, newReunion);
        this.showSuccessToast('Cambios guardados')
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    },
    _showAddedToast(idGenerado) {
      this.showAddedToast('',
        {
          icon: 'fa-plus',
          position: 'bottom-right',
          duration: 5000,
          containerClass: 'toast-added',
          action: {
            text: 'Agregar Ocurrencia',
            onClick: (e, toastObject) => {
              this.navegarSiguienteNivel(idGenerado)
              toastObject.goAway(0)
            },
            class: 'toast-action'
          },
        })
    }
  },

  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },
  },
  beforeCreate () {
    axios.all([
      axios.get(apiRoutes.reunionesRoute),
    ])
      .then(axios.spread(res => {
        this.reuniones = res.data
      }))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => {
        this.loading = false
      })
  },
  created () {
    for (let modelAttr in this.modeloReunion) {
      let valor = this.modeloReunion[modelAttr]

      if(valor.isTableField)
        this.tableFields.push(modelAttr)
    }
  },
}

</script>

<style lang="scss">

.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

i:hover {
  cursor: pointer;
}

.icon-slot {
  width: 60%;
  display: flex;
  justify-content: space-around;
}

.detalles span {
  margin-left: 8px;
}

.detail-list{
  color: $charcoal;
  .detail-item-title {
    color: $almost-black;
  }
}
</style>
