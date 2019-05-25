<template>
  <div>
    <div class="va-row">
      <!-- FORMULARIO PARA AGREGAR GRABACIÓN -->
      <div class="flex md6">
        <vuestic-widget :headerText="'Agregar Grabación'">
          <model-form ref="modelFormComponent"
          v-bind:entityModel="entityModel"
          v-bind:foreignKey="id"
          v-on:on-agregar="onAgregar">
          </model-form>
        </vuestic-widget>
      </div>

      <div class="detalles flex md6">
        <!-- DETALLES DE LA OCURRENCIA -->
        <vuestic-widget :headerText="`Detalles Ocurrencia ${this.ocurrencia.id}`">
          <div class="detalle-item">
            <i
              class="fa fa-key info-icon">
            </i>
            <span>id externo: {{this.ocurrencia.idexterno}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-clock-o info-icon">
            </i>
            <span>start time: {{this.ocurrencia.starttime}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-clock-o info-icon">
            </i>
            <span>duración: {{this.ocurrencia.duracion}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-check-square info-icon">
            </i>
            <span>estado: {{this.ocurrencia.status}}</span>
          </div>

        </vuestic-widget>
        <!-- DETALLES DE LA REUNIÓN -->
        <vuestic-widget :headerText="`Detalles reunión ${this.reunionId}`">
          <div class="detalle-item">
            <i
              class="fa fa-key info-icon">
            </i>
            <span>Uuid: {{this.reunion.uuid}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-key info-icon">
            </i>
            <span>Id externo: {{this.reunion.idsistemaexterno}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-link info-icon">
            </i>
            <span>URL join: {{this.reunion.urljoin}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-link info-icon">
            </i>
            <span>URL start: {{this.reunion.urlstart}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-id-card info-icon">
            </i>
            <span>Host id: {{this.reunion.hostid}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-calendar-o info-icon">
            </i>
            <span>Fecha creación: {{this.reunion.createdat}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-paperclip info-icon">
            </i>
            <span>Nombre: {{this.reunion.nombre}}</span>
          </div>
        </vuestic-widget>
      </div>
    </div>

    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Grabaciones'">
          <div class="table-responsive" v-if="hayDatos()">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>{{'id  externo'}}</td>
                <td>{{'play URL'}}</td>
                <td>{{'duración'}}</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(grabacion, index) in grabaciones">
                  <td>{{grabacion.idexterno}}</td>
                  <td>{{grabacion.playurl}}</td>
                  <td>{{grabacion.duracion}}</td>
                  <td align="right" class="valid">
                    <div class="icon-slot">
                      <i
                        class="fa fa-plus success-icon"
                        @click="navegarSiguienteNivel(index)">
                      </i>
                      <i
                        class="fa fa-eye info-icon"
                        @click="onDetail(index)">
                      </i>
                      <i
                        class="fa fa-pencil info-icon"
                        @click="onEdit(index)">
                      </i>
                      <i
                        class="fa fa-minus error-icon"
                        @click="onEliminar(index)">
                      </i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-else>No hay datos para mostrar</p>
        </vuestic-widget>
      </div>
    </div>

    <!-- MODAL -->
    <vuestic-modal ref="detail_modal"
                   :no-buttons="true"
                   v-bind:small="true">
      <div slot="title">Detalles</div>
      <div>
        <ul class="detail-list">
          <li><span class="detail-item-title">Id externo:</span> {{grabacionAux.idexterno}}</li>
          <li><span class="detail-item-title">Play URL:</span> {{grabacionAux.playurl}}</li>
          <li><span class="detail-item-title">Duración:</span> {{grabacionAux.duracion}}</li>
        </ul>
      </div>
    </vuestic-modal>
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
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="grabacionAux.idexterno"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-key icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Id externo'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="grabacionAux.idexterno"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-play-circle icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Play URL'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="grabacionAux.idexterno"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-hourglass-3 icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Duración'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </vuestic-modal>
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
import BadgeColumn from '../tables/BadgeColumn.vue'
import FieldsDef
  from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/fields-definition'
import ItemsPerPageDef
  from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/items-per-page-definition'
import QueryParams from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/query-params'
import { SpringSpinner } from 'epic-spinners'
import axios from 'axios'
import ModelForm from '../self-components/model-form/ModelForm'
import DBModels from '../../models/index'

Vue.component('badge-column', BadgeColumn)

export default {
  name: 'Table',
  components: {
    SpringSpinner,
    ModelForm
  },
  data () {
    return {
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      itemsPerPage: ItemsPerPageDef.itemsPerPage,
      sortFunctions: FieldsDef.sortFunctions,
      paginationPath: '',
      defaultTablePerPage: 6,
      queryParams: QueryParams,
      grabaciones: {},
      grabacion: {
        "idexterno": '',
        "ocurrenciaId": '',
        "playurl": '',
        "duracion": '',
      },
      grabacionAux: {
        "idexterno": '',
        "ocurrenciaId": '',
        "playurl": '',
        "duracion": '',
      },
      datoEliminar: '',
      id: this.$route.params.ocurrenciaId,
      ocurrencia: {
        "id": '',
        "idexterno": '',
        "starttime": '',
        "duracion": '',
        "status": '',
        "reunionvideoconferenciaId": '',
      },
      reunionId: this.$route.params.reunionId,
      reunion: {
        "uuid": '',
        "idsistemaexterno": '',
        "urljoin": '',
        "urlstart": '',
        "hostid": '',
        "createdat": '',
        "nombre": '',
      },
      entityModel: DBModels.GrabacionModel
    }
  },
  methods: {
    onAgregar (formStatus) {
      console.log(formStatus.model)
      this.$refs.modelFormComponent.clearForm()
      // this.grabacion.duracion = +this.grabacion.duracion
      // console.log(this.grabacion)
      axios.post('http://localhost:3000/grabaciones', formStatus.model
      ).then(res => {
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
              this.navegarSiguienteNivel('', idGenerado)
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
      let idArchivo = this.grabaciones[this.datoEliminar].id
      axios.delete(`http://localhost:3000/grabaciones/${idArchivo}`)
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
    navegarSiguienteNivel(index, id) {
      if (id) {
        this.$router.push({ name: 'archivo', params: { grabacionId: id } })
        return;
      }
      this.$router.push({ name: 'archivo', params: { grabacionId: this.grabaciones[index].id } })
    },
    onDetail(index) {
      this.$refs.detail_modal.open();
      this.grabacionAux = this.grabaciones[index]
    },
    onEdit(index) {
      this.grabacionAux = JSON.parse(JSON.stringify(this.grabaciones[index]));
      this.indexDato = index;
      this.$refs.edit_modal.open();
    },
    onGuardarCambios(){
      let idGrabacion = this.grabaciones[this.indexDato].id
      axios.patch(`http://localhost:3000/archivos/${idGrabacion}`, this.grabacionAux)
      .then(res => {
        delete this.grabaciones[this.indexDato]
        console.log(this.grabaciones)
        let newGrabacion = JSON.parse(JSON.stringify(this.grabacionAux))
        console.log(newGrabacion)
        Vue.set(this.grabaciones, this.indexDato, newGrabacion);
        this.showSuccessToast('Cambios guardados')
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    },
    hayDatos() {
      return this.grabaciones.length > 0
    },
  },

  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },
  },
  beforeCreate () {
    axios.all([
      axios.get(`http://localhost:3000/ocurrencias/${this.$route.params.ocurrenciaId}/grabaciones`),
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
      axios.get(`http://localhost:3000/ocurrencias/${this.id}`),
    ])
    .then(axios.spread(res => {
      this.ocurrencia = res.data
      this.grabacion.ocurrenciaId = +this.id
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })

    //GET PARA OBTENER DETALLES DE REUNIÓN
    axios.all([
      axios.get(`http://localhost:3000/reunionvideoconferencias/${this.reunionId}`),
    ])
    .then(axios.spread(res => {
      this.reunion = res.data
      // this.grabacion.ocurrenciaId = +this.id
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })
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
