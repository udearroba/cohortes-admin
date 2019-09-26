<template>
  <vuetable
    ref="vuetable"
    :api-mode="false"
    :fields="tableFieldsComputed"
    :css="css.table"
    :data="tableDataComputed"
  >
  <template slot="actions" scope="props">
      <div class="custom-actions">
        <udea-tooltip :message="'Agregar registro'">
          <i v-if="!noLinkAction"
          class="fa fa-plus success-icon"
          @click="onAdd(props.rowData, props.rowIndex)">
          </i>
        </udea-tooltip>
        <udea-tooltip :message="'Ver detalles'">
          <i
            class="fa fa-eye info-icon"
            @click="onDetails(props.rowData, props.rowIndex)">
          </i>
        </udea-tooltip>
        <udea-tooltip :message="'Editar registro'">
          <i
            class="fa fa-pencil info-icon"
            @click="onEdit(props.rowData, props.rowIndex)">
          </i>
        </udea-tooltip>
        <udea-tooltip :message="'Eliminar registro'">
          <i
            class="fa fa-minus error-icon"
            @click="onDelete(props.rowData, props.rowIndex)">
          </i>
        </udea-tooltip>
      </div>
    </template>
  </vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import DefaultPerPageDefinition from
'../../../vuestic-theme/vuestic-components/vuestic-datatable/data/items-per-page-definition'
import DataTableStyles from
'../../../vuestic-theme/vuestic-components/vuestic-datatable/data/data-table-styles'

import UdeaTooltip from '../ui/udea-tooltip/UdeaTooltip'

import _ from 'lodash'

export default {
  name: 'model-table',
  components: {
    Vuetable,
    UdeaTooltip,
  },
  props: {
    tableFields: {
      type: Array,
      required: true,
    },
    tableData: {
      type: [Array, Object],
      required: true,
    },
    entityModel: {
      type: Object,
    },
    noLinkAction: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
  },
  data () {
    return {
      colorClasses: {},
      filterText: '',
      dataCount: 0,
      css: DataTableStyles,
      loading: false,
      noDataTemplate: '',
      tooltipOptions: {
        content: 'Agregar registro',
        placement: 'top',
        delay: { show: 500, hide: 100 },
      },
    }
  },
  methods: {
    onAdd(data, index) {
      this.$emit('addClicked', data, index)
    },
    onDetails(data, index) {
      this.$emit('detailsClicked', data, index)
    },
    onEdit(data, index) {
      this.$emit('editClicked', data, index)
    },
    onDelete(data, index) {
      this.$emit('deleteClicked', data, index)
    },
  },
  computed: {
    tableFieldsComputed() {
      let slotActions =
      { name: '__slot:actions',
        title: 'Actions',
        width: '20%'}

      this.tableFields.push(slotActions)
      return this.tableFields
    },
    tableDataComputed() {
      if(!this.entityModel){
        //si un modelo no es pasado al componente, entonces no se hace ningún tipo de filtro a los datos
        return this.tableData
      }
      let tableDataComputed = _.cloneDeep(this.tableData)
      let arrayDurations = []
      let arrayUnix = []
      for (let [key, value] of Object.entries(this.entityModel)) {
          if (value.type === 'Duration')
            arrayDurations.push(key)
          else if (value.type === 'UnixTime')
            arrayUnix.push(key)
      }
      let dateFilter = this.$options.filters.date
      let durationFilter = this.$options.filters.duration
      for (let i = 0; i < tableDataComputed.length; i++) {
        for (let j = 0; j < arrayDurations.length; j++) {
          let durationOld = tableDataComputed[i][arrayDurations[j]]
          let formattedDuration = durationFilter(durationOld)
          tableDataComputed[i][arrayDurations[j]] = formattedDuration
        }
        for (let j = 0; j < arrayUnix.length; j++) {
          let durationOld = tableDataComputed[i][arrayUnix[j]]
          let formattedDuration = new Date(durationOld)
          formattedDuration = dateFilter(formattedDuration)
          tableDataComputed[i][arrayUnix[j]] = formattedDuration
        }
      }
      return tableDataComputed
    },
  },
  mounted () {
    this.$emit('initialized', this.$refs.vuetable)
  },
}
</script>

<style lang="scss">
  .custom-actions {
    display: flex;
    justify-content: space-around;
  }
</style>
