<template>
  <div>

    <div class="va-row">
      <!-- FORMULARIO PARA AGREGAR OCURRENCIA -->
      <div class="flex md6">
        <vuestic-widget :headerText="'Agregar Ocurrencia'">
          <form>
            <div class="va-row">
              <div class="flex md8">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="ocurrencia.idexterno"
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
                      v-model="ocurrencia.starttime"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-clock-o icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Hora de inicio'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="ocurrencia.duracion"
                      id="input-icon-left"
                      name="input-icon-left"
                      type="number"
                      required/>
                      <i class="fa fa-hourglass-3 icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Duración'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="ocurrencia.status"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-check icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Estado'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="btn btn-micro btn-primary"
                  @click="onAgregar">
                    {{'Agregar'}}
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </vuestic-widget>
      </div>

      <!-- DETALLES DE LA REUNIÓN -->
      <div class="detalles flex md6">
        <vuestic-widget :headerText="`Detalles reunión ${this.reunion.id}`">
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

    <!-- TABLA DE DATOS -->
    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Ocurrencias'">
          <div class="table-responsive" v-if="hayDatos()">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>{{'id externo'}}</td>
                <td>{{'start time'}}</td>
                <td>{{'duración'}}</td>
                <td>{{'estado'}}</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(ocurrencia, index) in ocurrencias">
                  <td>{{ocurrencia.idexterno}}</td>
                  <td>{{ocurrencia.starttime}}</td>
                  <td>{{ocurrencia.duracion}}</td>
                  <td>{{ocurrencia.status}}</td>
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

    <!-- VENTANAS MODALES -->
    <!-- DETALLES -->
    <vuestic-modal ref="detail_modal"
                   :no-buttons="true"
                   v-bind:small="true">
      <div slot="title">Detalles</div>
      <div>
        <ul class="detail-list">
          <li><span class="detail-item-title">Id externo:</span> {{ocurrenciaAux.idexterno}}</li>
          <li><span class="detail-item-title">Hora inicio:</span> {{ocurrenciaAux.starttime}}</li>
          <li><span class="detail-item-title">Duración:</span> {{ocurrenciaAux.duracion}}</li>
          <li><span class="detail-item-title">Estado:</span> {{ocurrenciaAux.status}}</li>
        </ul>
      </div>
    </vuestic-modal>

    <!-- EDICIÓN -->
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
                    v-model="ocurrenciaAux.idexterno"
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
                    v-model="ocurrenciaAux.starttime"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-clock-o icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Hora inicio'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="ocurrenciaAux.duracion"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-hourglass-3 icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Duración'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="ocurrenciaAux.status"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-check icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Estado'}}
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

Vue.component('badge-column', BadgeColumn)

export default {
  name: 'Table',
  components: {
    SpringSpinner,
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

      ocurrencias: {},
      ocurrencia: {
        "idexterno": '',
        "starttime": '',
        "duracion": '',
        "status": '',
      },
      ocurrenciaAux: {
        "idexterno": '',
        "starttime": '',
        "duracion": '',
        "status": '',
      },
      indexDato: '',
      id: this.$route.params.reunionId,
      reunion: {
        "uuid": '',
        "idsistemaexterno": '',
        "urljoin": '',
        "urlstart": '',
        "hostid": '',
        "createdat": '',
        "nombre": '',
      },
    }
  },
  methods: {
    onAgregar () {
      this.ocurrencia.duracion = +this.ocurrencia.duracion
      axios.post('http://localhost:3000/ocurrencias', this.ocurrencia
      ).then(res => {
        this.ocurrencia.idexterno = '',
        this.ocurrencia.starttime = '',
        this.ocurrencia.duracion = '',
        this.ocurrencia.status = '',
        this.ocurrencias.push(res.data)
        let idGenerado = res.data.id
        this.showAddedToast('',
        {
          icon: 'fa-plus',
          position: 'bottom-right',
          duration: 5000,
          containerClass: 'toast-added',
          action: {
            text: 'Agregar Grabación',
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
      this.indexDato = index;
    },
    onEliminarConfirmado() {
      let idOcurrencia = this.ocurrencias[this.indexDato].id
      axios.delete(`http://localhost:3000/ocurrencias/${idOcurrencia}`)
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
    navegarSiguienteNivel(index, id) {
      if (id) {
        this.$router.push({ name: 'grabacion', params: { ocurrenciaId: id } })
        return;
      }
      this.$router.push({ name: 'grabacion', params: { ocurrenciaId: this.ocurrencias[index].id } })
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
    onGuardarCambios(){
      let idOcurrencia = this.ocurrencias[this.indexDato].id
      axios.patch(`http://localhost:3000/ocurrencias/${idOcurrencia}`, this.ocurrenciaAux)
      .then(res => {
        delete this.ocurrencias[this.indexDato]
        let newOcurrencia = JSON.parse(JSON.stringify(this.ocurrenciaAux))
        Vue.set(this.ocurrencias, this.indexDato, newOcurrencia);
        this.showSuccessToast('Cambios guardados')
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    },
    hayDatos() {
      return this.ocurrencias.length > 0
    },
  },

  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },

  },
  beforeCreate () {
    axios.all([
      axios.get(`http://localhost:3000/reunionvideoconferencias/${this.$route.params.reunionId}/ocurrencias`),
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
      axios.get(`http://localhost:3000/reunionvideoconferencias/${this.id}`),
    ])
    .then(axios.spread(res => {
      this.reunion = res.data
      this.ocurrencia.reunionvideoconferenciaId = +this.id
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

.detail-list{
  color: $charcoal;
  .detail-item-title {
    color: $almost-black;
  }
}
</style>
