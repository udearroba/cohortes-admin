<template>
  <div>

    <div class="va-row">
      <!-- DETALLES DE LA GRABACIÓN -->
      <div class="flex md6">
        <vuestic-widget :headerText="'Detalles grabación'">
          <form>
            <div class="va-row">
              <div class="flex md8">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" name="input-icon-left"
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
        </vuestic-widget>
      </div>

      <!-- FORMULARIO PARA AGREGAR ARCHIVO -->
      <div class="flex md6">
        <vuestic-widget :headerText="'Agregar Archivo'">
          <form>
            <div class="va-row">
              <div class="flex md8">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="archivo.idexterno"
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
                      v-model="archivo.formato"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-file-o icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Formato'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="archivo.url"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-link icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Url'}}
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
    </div>

    <div class="va-row">
      <div class="flex xs12 md12">
        <vuestic-widget :headerText="'Archivos'">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>{{'id externo'}}</td>
                <td>{{'formato'}}</td>
                <td>{{'url'}}</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(archivo, index) in archivos">
                  <td>{{archivo.idexterno}}</td>
                  <td>{{archivo.formato}}</td>
                  <td>{{archivo.url}}</td>
                  <td align="right" class="valid">
                    <div class="icon-slot">
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
                   v-bind:small="true"
                   no-buttons="true">
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
                    v-model="archivo.idexterno"
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
                    v-model="archivo.formato"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-file-o icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Formato'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="archivo.url"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-link icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Url'}}
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
      apiUrl: 'https://vuetable.ratiw.net/api/users',
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      itemsPerPage: ItemsPerPageDef.itemsPerPage,
      sortFunctions: FieldsDef.sortFunctions,
      paginationPath: '',
      defaultTablePerPage: 6,
      queryParams: QueryParams,
      archivos: {},
      archivo: {
        "idexterno": '',
        "formato": '',
        "url": '',
        "grabacionId": 9
      },
      datoEliminar: ''
    }
  },
  methods: {
    onAgregar () {
      axios.post('http://localhost:3000/archivos', this.archivo
      ).then(res => {
        this.archivo.idexterno = ''
        this.archivo.formato = ''
        this.archivo.url = ''
        this.archivos.push(res.data)
      }).catch(error => {
        console.log(error);
      })
    },
    onAddDummy () {
      axios.post('http://localhost:3000/archivos',
      {
        "idexterno": 'idDummy',
        "formato": 'formatoDummy',
        "url": 'urlDummy',
        "grabacionId": 9
      }
      ).then(res => {
        this.archivos.push(res.data)
        this.showAddedToast()
      }).catch(error => {
        console.log(error);
      })
    },
    onEliminar(index) {
      this.$refs.confirm_modal.open();
      this.datoEliminar = index;
    },
    onEliminarConfirmado() {
      let idArchivo = this.archivos[this.datoEliminar].id
      axios.delete(`http://localhost:3000/archivos/${idArchivo}`)
      .then(res => {
        this.archivos.splice(this.datoEliminar,1)
        this.showDeletedToast()
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
      axios.get('http://localhost:3000/archivos'),
    ])
      .then(axios.spread(res => {
        this.archivos = res.data
        console.log(res.data)
      }))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => {
        this.loading = false
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
</style>