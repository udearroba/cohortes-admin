<template>
  <div>

    <div class="va-row">
      <!-- FORMULARIO PARA AGREGAR OCURRENCIA -->
      <div class="flex md6">
        <model-form ref="modelFormComponent"
        :entityModel="modeloOcurrencia"
        :foreignKey="id"
        :parentData="datosReunion"
        @on-agregar="onAgregar"
        @on-agregar-and-continue="onAgregarAndContinue">
        </model-form>
      </div>

      <!-- DETALLES DE LA REUNIÓN -->
      <div class="detalles flex md6">
        <vuestic-widget :headerText="`Detalles reunión`">
          <model-detail
          :entityModel="modeloReunion"
          :entityData="datosReunion">
          </model-detail>
        </vuestic-widget>
      </div>
    </div>

    <!-- TABLA DE DATOS -->
    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Ocurrencias'">
          <model-table
          :tableFields="tableFields"
          :tableData="ocurrencias"
          :entityModel="modeloOcurrencia"
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
      :entityModel="modeloOcurrencia"
      :entityData="ocurrenciaAux"
      @initialized="handleDetailsModalInitialization"
    ></details-modal>

    <!-- EDICIÓN -->
    <edit-modal
      :entityModel="modeloOcurrencia"
      :entityData="ocurrenciaAux"
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
import ModelDetail from '../self-components/model-detail/ModelDetail'
import ModelTable from '../self-components/model-table/ModelTable'
import DetailsModal from '../self-components/modals/details/DetailsModal'
import EditModal from '../self-components/modals/edit/EditModal'
import apiRoutes from '../../services/apiRoutes'

import DBModels from '../../models/index'

export default {
  name: 'Table',
  components: {
    ModelForm,
    ModelDetail,
    ModelTable,
    DetailsModal,
    EditModal,
  },
  data () {
    return {
      modeloOcurrencia: DBModels.OcurrenciaModel,
      modeloReunion: DBModels.ReunionModel,
      datosReunion: {},
      tableFields: [],

      ocurrencias: {},
      ocurrenciaAux: {},
      indexDato: '',
      id: this.$route.params.reunionId,
      reunion: {},
    }
  },
  methods: {
    onAgregar (validatedModel) {
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      axios.post(apiRoutes.ocurrenciasRoute, validatedModel.model)
      .then(res => {
        this.$refs.modelFormComponent.clearForm()
        this.ocurrencias.push(res.data)
        let idGenerado = res.data.id
        this._showAddedToast(idGenerado)
      }).catch(error => {
        console.log(error);
        this.showErrorToast()
      })
    },
    onAgregarAndContinue (validatedModel) {
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      axios.post(apiRoutes.ocurrenciasRoute, validatedModel.model)
      .then(res => {
        this.$refs.modelFormComponent.clearForm()
        this.ocurrencias.push(res.data)
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
      let idOcurrencia = this.ocurrencias[this.indexDato].id
      axios.delete(apiRoutes.getOcurrenciasFromId(idOcurrencia))
      .then(res => {
        this.ocurrencias.splice(this.indexDato,1)
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
      this.$router.push({ name: 'grabacion', params: { ocurrenciaId: id }})
    },
    onDetail(index) {
      this.$refs.detail_modal.open();
      this.ocurrenciaAux = this.ocurrencias[index]
    },
    onEdit(index) {
      this.ocurrenciaAux = JSON.parse(JSON.stringify(this.ocurrencias[index]));
      this.indexDato = index;
      this.$refs.edit_modal.open();
    },
    onGuardarCambios(validatedModel){
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      let idOcurrencia = this.ocurrencias[this.indexDato].id
      this.ocurrenciaAux = validatedModel
      axios.patch(apiRoutes.getOcurrenciasFromId(idOcurrencia), validatedModel.model)
      .then(res => {
        delete this.ocurrencias[this.indexDato]
        let newOcurrencia = JSON.parse(JSON.stringify(this.ocurrenciaAux))
        newOcurrencia = newOcurrencia.model
        Vue.set(this.ocurrencias, this.indexDato, newOcurrencia);
        this.showSuccessToast('Cambios guardados')
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    },
    onAddClicked(data, index) {
      this.navegarSiguienteNivel(data.id)
    },
    onDetailsClicked(data, index) {
      this.ocurrenciaAux = data
      this.$data.detailsModalRef.open();
    },
    onEditClicked(data, index) {
      this.ocurrenciaAux = data
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
    },
  },

  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },

  },
  beforeCreate () {
    axios.all([
      axios.get(apiRoutes.getOcurrenciasFromIdReunion(this.$route.params.reunionId)),
    ])
      .then(axios.spread(res => {
        this.ocurrencias = res.data
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
    axios.all([
      axios.get(`${apiRoutes.reunionesRoute}/${this.id}`),
    ])
    .then(axios.spread(res => {
      this.datosReunion = res.data
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })

    for (let modelAttr in this.modeloOcurrencia) {
      let valor = this.modeloOcurrencia[modelAttr]

      if(valor.isTableField)
        this.tableFields.push(modelAttr)
    }
  }
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
