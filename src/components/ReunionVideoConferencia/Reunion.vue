<template>
  <div>

    <div class="va-row">
      <!-- FORMULARIO PARA AGREGAR REUNIÓN -->
      <div class="flex md12">
        <vuestic-widget :headerText="'Agregar Reunión'">
          <form>
            <div class="va-row">
              <div class="flex md5">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="reunion.uuid"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-key icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Uuid'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="reunion.idsistemaexterno"
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
                      v-model="reunion.urljoin"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-link icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Url join'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="reunion.urlstart"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-link icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Url start'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="btn btn-micro btn-primary"
                  @click="onAgregar">
                    {{'Agregar'}}
                  </div>
                </fieldset>
              </div>
              <div class="flex md5">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="reunion.hostid"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-id-card icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Host id'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="reunion.createdat"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-calendar-o icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Fecha creación'}}
                      </label><i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                      v-model="reunion.nombre"
                      id="input-icon-left"
                      name="input-icon-left"
                      required/>
                      <i class="fa fa-paperclip icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">
                        {{'Nombre'}}
                      </label><i class="bar"></i>
                    </div>
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
        <vuestic-widget :headerText="'Reuniones'">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
              <tr>
                <td>{{'Nombre'}}</td>
                <td>{{'Fecha creación'}}</td>
                <td>{{'Id externo'}}</td>
                <td>{{'URL join'}}</td>
                <td></td>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(reunion, index) in reuniones">
                  <td>{{reunion.nombre}}</td>
                  <td>{{reunion.createdat}}</td>
                  <td>{{reunion.idsistemaexterno}}</td>
                  <td>{{reunion.urljoin}}</td>
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
          <li><span class="detail-item-title">Uuid:</span> {{reunionAux.uuid}}</li>
          <li><span class="detail-item-title">Id externo:</span> {{reunionAux.idsistemaexterno}}</li>
          <li><span class="detail-item-title">URL join:</span> {{reunionAux.urljoin}}</li>
          <li><span class="detail-item-title">URL start:</span> {{reunionAux.urlstart}}</li>
          <li><span class="detail-item-title">Host id:</span> {{reunionAux.hostid}}</li>
          <li><span class="detail-item-title">Fecha creación:</span> {{reunionAux.createdat}}</li>
          <li><span class="detail-item-title">Nombre:</span> {{reunionAux.nombre}}</li>
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
                    v-model="reunionAux.uuid"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-key icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Uuid'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="reunionAux.idsistemaexterno"
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
                    v-model="reunionAux.urljoin"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-key icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'URL join'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="reunionAux.urlstart"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-key icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'URL start'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="reunionAux.hostid"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-key icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Host id'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="reunionAux.createdat"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-key icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Fecha creación'}}
                    </label><i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                    v-model="reunionAux.nombre"
                    id="input-icon-left"
                    name="input-icon-left"
                    required/>
                    <i class="fa fa-key icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">
                      {{'Nombre'}}
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
      reuniones: {},
      reunion: {
        "uuid": '',
        "idsistemaexterno": '',
        "urljoin": '',
        "urlstart": '',
        "hostid": '',
        "createdat": '',
        "nombre": '',
      },
      reunionAux: {
        "id": '',
        "uuid": '',
        "idsistemaexterno": '',
        "urljoin": '',
        "urlstart": '',
        "hostid": '',
        "createdat": '',
        "nombre": '',
      },
      indexDato: '',
    }
  },
  methods: {
    onAgregar () {
      console.log(this.reunion)
      axios.post('http://localhost:3000/reunionvideoconferencias', this.reunion
      ).then(res => {
        this.reunion.uuid = '',
        this.reunion.idsistemaexterno = '',
        this.reunion.urljoin = '',
        this.reunion.urlstart = '',
        this.reunion.hostid = '',
        this.reunion.createdat = '',
        this.reunion.nombre = '',
        this.reuniones.push(res.data)
        this.showAddedToast()
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
      axios.delete(`http://localhost:3000/reunionvideoconferencias/${idReunion}`)
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
    navegarSiguienteNivel(index) {
      this.$router.push({ name: 'ocurrencia', params: { id: this.reuniones[index].id } })
    },
    onDetail(index) {
      this.$refs.detail_modal.open();
      this.reunionAux = this.reuniones[index]
    },
    onEdit(index) {
      this.reunionAux = JSON.parse(JSON.stringify(this.reuniones[index]));
      this.indexDato = index;
      this.$refs.edit_modal.open();
    },
    onGuardarCambios(){
      let idReunion = this.reuniones[this.indexDato].id
      axios.patch(`http://localhost:3000/reunionvideoconferencias/${idReunion}`, this.reunionAux)
      .then(res => {
        delete this.reuniones[this.indexDato]
        console.log(this.reuniones)
        let newReunion = JSON.parse(JSON.stringify(this.reunionAux))
        console.log(newReunion)
        Vue.set(this.reuniones, this.indexDato, newReunion);
        this.showSuccessToast('Cambios guardados')
      })
      .catch(error => {
        console.log(error)
        this.showErrorToast()
      });
    },
  },

  computed: {
    isToastContentPresent () {
      return !!(this.toastText || this.toastIcon)
    },
  },
  beforeCreate () {
    axios.all([
      axios.get(`http://localhost:3000/reunionvideoconferencias`),
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
