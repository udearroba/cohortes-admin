<template>
  <div>

    <div class="va-row">
      <!-- FORMULARIO PARA AGREGAR ARCHIVO -->
      <div class="flex md6">
        <model-form ref="modelFormComponent"
        :entityModel="modeloArchivo"
        :foreignKey="id"
        :parentData="datosGrabacion"
        @on-agregar="onAgregar">
        </model-form>
      </div>

      <div class="detalles flex md6">
        <!-- DETALLES DE LA GRABACIÓN -->
        <vuestic-widget :headerText="`Detalles Grabación`">
          <model-detail
          :entityModel="modeloGrabacion"
          :entityData="datosGrabacion">
          </model-detail>
        </vuestic-widget>
        <!-- DETALLES DE LA OCURRENCIA -->
        <vuestic-widget :headerText="`Detalles Ocurrencia`">
          <model-detail
          :entityModel="modeloOcurrencia"
          :entityData="datosOcurrencia">
          </model-detail>
        </vuestic-widget>
      </div>
    </div>

    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Ocurrencias'">
          <model-table
          :tableFields="tableFields"
          :tableData="archivos"
          :noLinkAction="true"
          @detailsClicked="onDetailsClicked"
          @editClicked="onEditClicked"
          @deleteClicked="onDeleteClicked"
          ></model-table>
        </vuestic-widget>
      </div>
    </div>

    <!-- MODAL -->
    <!-- DETALLES -->
    <details-modal
      :entityModel="modeloArchivo"
      :entityData="archivoAux"
      @initialized="handleDetailsModalInitialization"
    ></details-modal>
    <edit-modal
      :entityModel="modeloArchivo"
      :entityData="archivoAux"
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
  name: 'Archivo',
  components: {
    ModelForm,
    ModelDetail,
    ModelTable,
    DetailsModal,
    EditModal,
  },
  data () {
    return {
      modeloArchivo: DBModels.ArchivoModel,
      modeloGrabacion: DBModels.GrabacionModel,
      modeloOcurrencia: DBModels.OcurrenciaModel,
      datosGrabacion: {},
      datosOcurrencia: {},
      tableFields: [],

      archivos: {},
      archivoAux: {},
      indexDato: '',
      id: this.$route.params.grabacionId,
      grabacion: {},
      ocurrenciaId: this.$route.params.ocurrenciaId,
      ocurrencia: {},
    }
  },
  methods: {
    onAgregar (validatedModel) {
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      axios.post(apiRoutes.archivosRoute, validatedModel.model)
      .then(res => {
        // LIMPIAR FORMULARIO
        this.$refs.modelFormComponent.clearForm()
        this.archivos.push(res.data)
        let idGenerado = res.data.id
        this.showAddedToast('',
        {
          icon: 'fa-plus',
          position: 'bottom-right',
          duration: 5000,
          containerClass: 'toast-added',
        })
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
      let idArchivo = this.archivos[this.indexDato].id
      axios.delete(apiRoutes.getArchivosFromId(idArchivo))
      .then(res => {
        this.archivos.splice(this.indexDato,1)
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
    onDetail(index) {
      this.$refs.detail_modal.open();
      this.archivoAux = this.archivos[index]
    },
    onEdit(index) {
      this.archivoAux = JSON.parse(JSON.stringify(this.archivos[index]));
      this.indexDato = index;
      this.$refs.edit_modal.open();
    },
    onGuardarCambios(validatedModel){
      if (!validatedModel.isValid) {
        this.showErrorToast(validatedModel.message, null, true)
        return false;
      }
      let idArchivo = this.archivos[this.indexDato].id
      this.archivoAux = validatedModel
      axios.patch(apiRoutes.getArchivosFromId(idArchivo), validatedModel.model)
      .then(res => {
        delete this.archivos[this.indexDato]
        let newArchivo = JSON.parse(JSON.stringify(this.archivoAux))
        newArchivo = newArchivo.model
        Vue.set(this.archivos, this.indexDato, newArchivo);
        this.showSuccessToast('Cambios guardados')
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    },
    onDetailsClicked(data, index) {
      this.archivoAux = data
      this.$data.detailsModalRef.open();
    },
    onEditClicked(data, index) {
      this.archivoAux = data
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
      axios.get(apiRoutes.getArchivosFromIdGrabacion(this.$route.params.grabacionId)),
    ])
      .then(axios.spread(res => {
        this.archivos = res.data
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
    //obtiene detalles de la grabación
    axios.all([
      axios.get(apiRoutes.getGrabacionesFromId(this.id)),
    ])
    .then(axios.spread(res => {
      this.datosGrabacion = res.data
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })

    //obtiene detalles de la ocurrencia
    axios.all([
      axios.get(apiRoutes.getOcurrenciasFromId(this.ocurrenciaId)),
    ])
    .then(axios.spread(res => {
      this.datosOcurrencia = res.data
      this.grabacion.ocurrenciaId = +this.id
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })

    for (let modelAttr in this.modeloArchivo) {
      let valor = this.modeloArchivo[modelAttr]

      if(valor.isTableField)
        this.tableFields.push(modelAttr)
    }
  }
}

</script>

<style lang="scss" scoped>

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
