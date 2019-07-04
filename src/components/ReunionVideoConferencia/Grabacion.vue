<template>
  <div>
    <div class="va-row">
      <!-- FORMULARIO PARA AGREGAR GRABACIÓN -->
      <div class="flex md6">
        <model-form ref="modelFormComponent"
        :entityModel="modeloGrabacion"
        :foreignKey="id"
        @on-agregar="onAgregar">
        </model-form>
      </div>

      <div class="detalles flex md6">
        <!-- DETALLES DE LA OCURRENCIA -->
        <vuestic-widget :headerText="`Detalles ocurrencia`">
          <model-detail
          :entityModel="modeloOcurrencia"
          :entityData="datosOcurrencia">
          </model-detail>
        </vuestic-widget>
        <!-- DETALLES DE LA REUNIÓN -->
        <vuestic-widget :headerText="`Detalles reunión`">
          <model-detail
          v-bind:entityModel="modeloReunion"
          v-bind:entityData="datosReunion">
          </model-detail>
        </vuestic-widget>
      </div>
    </div>

    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Grabaciones'">
          <model-table
          :tableFields="tableFields"
          :tableData="grabaciones"
          @addClicked="onAddClicked"
          @detailsClicked="onDetailsClicked"
          @editClicked="onEditClicked"
          @deleteClicked="onDeleteClicked"
          ></model-table>
        </vuestic-widget>
      </div>
    </div>

    <!-- MODAL -->
    <details-modal
      :entityModel="modeloGrabacion"
      :entityData="grabacionAux"
      @initialized="handleDetailsModalInitialization"
    ></details-modal>

    <edit-modal
      :entityModel="modeloGrabacion"
      :entityData="grabacionAux"
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
import DBModels from '../../models/index'
import apiRoutes from '../../services/apiRoutes'

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
      grabaciones: [],
      grabacionAux: {},
      datoEliminar: '',
      id: this.$route.params.ocurrenciaId,
      ocurrencia: {},
      reunionId: this.$route.params.reunionId,
      reunion: {},
      modeloGrabacion: DBModels.GrabacionModel,
      modeloOcurrencia: DBModels.OcurrenciaModel,
      modeloReunion: DBModels.ReunionModel,
      datosOcurrencia: {},
      datosReunion: {},
      tableFields: [],
    }
  },
  methods: {
    onAgregar (validatedModel) {
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      axios.post(apiRoutes.grabacionesRoute, validatedModel.model)
      .then(res => {
        // LIMPIAR FORMULARIO
        this.$refs.modelFormComponent.clearForm()
        this.grabaciones.push(res.data)
        let idGenerado = res.data.id
        this.showAddedToast('',
        {
          icon: 'fa-plus',
          position: 'bottom-right',
          duration: 5000,
          containerClass: 'toast-added',
          action: {
            text: 'Agregar Archivo',
            onClick: (e, toastObject) => {
              this.navegarSiguienteNivel(idGenerado)
              toastObject.goAway(0)
            },
            class: 'toast-action'
          },
        })
      }).catch(error => {
        console.log(error);
        this.showErrorToast()
      })
    },
    onEliminar(index) {
      this.$refs.confirm_modal.open();
      this.datoEliminar = index;
    },
    onEliminarConfirmado() {
      let idGrabacion = this.grabaciones[this.datoEliminar].id
      axios.delete(apiRoutes.getGrabacionesFromId(idGrabacion))
      .then(res => {
        this.grabaciones.splice(this.datoEliminar,1)
        this.showDeletedToast()
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    },
    onEliminarCanceled() {
      this.datoEliminar = '';
    },
    //este método permite navegar al siguiente nivel basado en el id del elemento.
    navegarSiguienteNivel(id) {
        this.$router.push({ name: 'archivo', params: { grabacionId: id }})
    },
    onEdit(index) {
      this.grabacionAux = JSON.parse(JSON.stringify(this.grabaciones[index]));
      this.indexDato = index;
      this.$refs.edit_modal.open();
    },
    onGuardarCambios(model){
      let idGrabacion = this.grabaciones[this.indexDato].id
      this.grabacionAux = model
      axios.patch(apiRoutes.getGrabacionesFromId(idGrabacion), this.grabacionAux)
      .then(res => {
        delete this.grabaciones[this.indexDato]
        let newGrabacion = JSON.parse(JSON.stringify(this.grabacionAux))
        Vue.set(this.grabaciones, this.indexDato, newGrabacion);
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
      this.grabacionAux = data
      this.$data.detailsModalRef.open();
    },
    onEditClicked(data, index) {
      this.grabacionAux = data
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
  },

  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },
  },
  beforeCreate () {
    axios.all([
      axios.get(apiRoutes.getGrabacionesFromIdOcurrencia(this.$route.params.ocurrenciaId))
    ])
      .then(axios.spread(res => {
        this.grabaciones = res.data
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
    //GET PARA OBTENER DETALLES DE OCURRENCIA
    axios.all([
      axios.get(apiRoutes.getOcurrenciasFromId(this.id)),
    ])
    .then(axios.spread(res => {
      this.ocurrencia = res.data
      this.datosOcurrencia = res.data
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })

    //GET PARA OBTENER DETALLES DE REUNIÓN
    axios.all([
      axios.get(apiRoutes.getReunionesFromId(this.reunionId)),
    ])
    .then(axios.spread(res => {
      this.reunion = res.data
      this.datosReunion = res.data
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })

    for (let modelAttr in this.modeloGrabacion) {
      let valor = this.modeloGrabacion[modelAttr]

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
</style>
