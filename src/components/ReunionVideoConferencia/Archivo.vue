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
                      <input id="input-icon-left" name="input-icon-left"
                             required/>
                      <i class="fa fa-key icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Id externo'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" name="input-icon-left"
                             required/>
                      <i class="fa fa-file-o icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Formato'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input id="input-icon-left" name="input-icon-left"
                             required/>
                      <i class="fa fa-link icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Url'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="btn btn-micro btn-primary"
                  @click="mostrarArchivos">
                    {{'Agregar'}}
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
                <tr v-for="archivo in archivos">
                  <td>{{archivo.idexterno}}</td>
                  <td>{{archivo.formato}}</td>
                  <td>{{archivo.url}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </vuestic-widget>
      </div>
    </div>
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
      archivos: {}
    }
  },
  methods: {
    mostrarArchivos () {
      console.log(this.archivos[0]);
      axios.post('http://localhost:3000/archivos', {
        "id": 8,
        "idexterno": "idexterno8",
        "ocurrenciaId": 3
      }).then(res => {
        console.log(res);
        this.archivos.push(res.data);
      }).catch(error => {
        console.log(error);
      })
    }
  },
  beforeCreate () {
    axios.all([
      axios.get('http://localhost:3000/archivos'),
    ])
      .then(axios.spread(res => {
        this.archivos = res.data
        console.log(res.data)
        // fillTable();
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
</style>
