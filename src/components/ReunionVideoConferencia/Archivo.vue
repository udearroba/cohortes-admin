<template>
  <div>

    <div class="va-row">
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
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="archivo.pesobyte"
                      id="input-icon-left"
                      name="input-icon-left"
                      type="number"
                      required/>
                      <i class="fa fa-files-o icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Peso'}}
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


      <div class="detalles flex md6">
        <!-- DETALLES DE LA GRABACIÓN -->
        <vuestic-widget :headerText="`Detalles grabación ${this.grabacion.id}`">
          <div class="detalle-item">
            <i
              class="fa fa-clock-o info-icon">
            </i>
            <span>id externo: {{this.grabacion.idexterno}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-play-circle info-icon">
            </i>
            <span>play url: {{this.grabacion.playurl}}</span>
          </div>
          <div class="detalle-item">
            <i
              class="fa fa-hourglass-3 info-icon">
            </i>
            <span>duración: {{this.grabacion.duracion}}</span>
          </div>
        </vuestic-widget>
        <!-- DETALLES DE LA OCURRENCIA -->
        <vuestic-widget :headerText="`Detalles Ocurrencia ${this.ocurrenciaId}`">
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
        <vuestic-widget :headerText="'Archivos'">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>{{'id externo'}}</td>
                <td>{{'formato'}}</td>
                <td>{{'url'}}</td>
                <td>{{'Peso'}}</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(archivo, index) in archivos">
                  <td>{{archivo.idexterno}}</td>
                  <td>{{archivo.formato}}</td>
                  <td>{{archivo.url}}</td>
                  <td>{{archivo.pesobyte}}</td>
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
                   :no-buttons="true"
                   v-bind:small="true">
      <div slot="title">Detalles</div>
      <div>
        <ul class="detail-list">
          <li><span class="detail-item-title">Id externo:</span> {{archivoAux.idexterno}}</li>
          <li><span class="detail-item-title">Formato:</span> {{archivoAux.formato}}</li>
          <li><span class="detail-item-title">Url:</span> {{archivoAux.url}}</li>
          <li><span class="detail-item-title">Peso:</span> {{archivoAux.pesobyte}}</li>
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
                    v-model="archivoAux.idexterno"
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
                    v-model="archivoAux.formato"
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
                    v-model="archivoAux.url"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-link icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Url'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="archivoAux.pesobyte"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-files-o icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Peso'}}
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
      archivos: {},
      archivo: {
        "idexterno": '',
        "formato": '',
        "url": '',
        "grabacionId": '',
        "pesobyte": '',
      },
      archivoAux: {
        "idexterno": '',
        "formato": '',
        "url": '',
        "grabacionId": '',
        "pesobyte": '',
      },
      indexDato: '',
      id: this.$route.params.grabacionId,
      grabacion: {
        "id": '',
        "idexterno": '',
        "ocurrenciaId": '',
        "playurl": '',
        "duracion": '',
      },
      ocurrenciaId: this.$route.params.ocurrenciaId,
      ocurrencia: {
        "id": '',
        "idexterno": '',
        "starttime": '',
        "duracion": '',
        "status": '',
        "reunionvideoconferenciaId": '',
      },
    }
  },
  methods: {
    onAgregar () {
      this.archivo.pesobyte = +this.archivo.pesobyte
      axios.post('http://localhost:3000/archivos', this.archivo
      ).then(res => {
        this.archivo.idexterno = ''
        this.archivo.formato = ''
        this.archivo.url = ''
        this.archivo.pesobyte = ''
        this.archivos.push(res.data)
        this.showAddedToast()
      }).catch(error => {
        console.log(this.archivo);
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
      axios.delete(`http://localhost:3000/archivos/${idArchivo}`)
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
    onGuardarCambios(){
      let idArchivo = this.archivos[this.indexDato].id
      axios.patch(`http://localhost:3000/archivos/${idArchivo}`, this.archivoAux)
      .then(res => {
        delete this.archivos[this.indexDato]
        console.log(this.archivos)
        let newArchivo = JSON.parse(JSON.stringify(this.archivoAux))
        console.log(newArchivo)
        Vue.set(this.archivos, this.indexDato, newArchivo);
        this.showSuccessToast('Cambios guardados')
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    }
  },

  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },
  },
  beforeCreate () {
    //GET PARA OBTENER DETALLES DE GRABACIÓN
    axios.all([
      axios.get(`http://localhost:3000/grabaciones/${this.$route.params.grabacionId}/archivos`),
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
    axios.all([
      axios.get(`http://localhost:3000/grabaciones/${this.id}`),
    ])
    .then(axios.spread(res => {
      this.grabacion = res.data
      this.archivo.grabacionId = +this.id
    }))
    .catch(error => {
      console.log(error)
      this.errored = true
    })

    //GET PARA OBTENER DETALLES DE OCURRENCIA
    axios.all([
      axios.get(`http://localhost:3000/ocurrencias/${this.ocurrenciaId}`),
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
