<template>
  <div>

    <div class="va-row">
      <!-- FORMULARIO PARA AGREGAR GRABACIÓN -->
      <div class="flex md6">
        <vuestic-widget :headerText="'Agregar Grabación'">
          <form>
            <div class="va-row">
              <div class="flex md8">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="grabacion.idexterno"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-key icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        Id externo
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="btn btn-micro btn-primary"
                  @click="onAgregar">
                    {{'Agregar'}}
                  </div>
                  <div class="btn btn-micro btn-primary"
                  @click="onAddDummy">
                    {{'Add dummy data'}}
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </vuestic-widget>
      </div>

      <!-- DETALLES DE LA OCURRENCIA -->
      <div class="detalles flex md6">
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
      </div>
    </div>

    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Grabaciones'">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>{{'id externo'}}</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(grabacion, index) in grabaciones">
                  <td>{{grabacion.idexterno}}</td>
                  <td align="right" class="valid">
                    <div class="icon-slot">
                      <router-link
                        v-bind:to="'../archivo/' + grabacion.id"
                        :target="_self">
                        <i
                          class="fa fa-plus success-icon">
                        </i>
                      </router-link>
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
        </vuestic-widget>
      </div>
    </div>

    <!-- MODAL -->
    <vuestic-modal ref="detail_modal"
                   :no-buttons="true"
                   v-bind:small="true">
      <div slot="title">Detalles</div>
      <div>
        <ul>
          <li>Detail 1: detail 1</li>
          <li>Detail 2: detail 2</li>
          <li>Detail 3: detail 3</li>
        </ul>
      </div>
    </vuestic-modal>
    <vuestic-modal ref="edit_modal"
                   v-on:ok="onEliminarConfirmado"
                   v-on:canceled="onEliminarCanceled"
                   :ok-class="'btn btn-info btn-micro'"
                   :cancel-class="'btn btn-pale btn-micro'"
                   :close-icon-shown="false"
                   :okText="'Aceptar' | translate"
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
                    v-model="grabacion.idexterno"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-key icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Id externo'}}
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
      grabaciones: {},
      grabacion: {
        "idexterno": '',
        "ocurrenciaId": ''
      },
      datoEliminar: '',
      id: this.$route.params.id,
      ocurrencia: {
        "id": '',
        "idexterno": '',
        "starttime": '',
        "duracion": '',
        "status": '',
        "reunionvideoconferenciaId": '',
      }
    }
  },
  methods: {
    onAgregar () {
      console.log(this.grabacion)
      axios.post('http://localhost:3000/grabaciones', this.grabacion
      ).then(res => {
        this.grabacion.idexterno = ''
        this.grabaciones.push(res.data)
        this.showAddedToast()
      }).catch(error => {
        console.log(error);
        this.showErrorToast()
      })
    },
    onAddDummy () {
      let grabacionTest = 
      {
        "idexterno": 'idDummy',
        "ocurrenciaId": +this.id
      }
      console.log(grabacionTest)
      axios.post('http://localhost:3000/grabaciones', grabacionTest)
      .then(res => {
        this.grabaciones.push(res.data)
        this.showAddedToast()
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
    onDetail(index) {
      this.$refs.detail_modal.open();
    },
    onEdit(index) {
      this.$refs.edit_modal.open();
    },
  },
  
  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },
  },
  beforeCreate () {
    axios.all([
      axios.get(`http://localhost:3000/ocurrencias/${this.$route.params.id}/grabaciones`),
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