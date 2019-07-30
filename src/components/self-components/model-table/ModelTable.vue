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
        <i v-if="!noLinkAction"
          class="fa fa-plus success-icon"
          @click="onAdd(props.rowData, props.rowIndex)">
        </i>
        <i
          class="fa fa-eye info-icon"
          @click="onDetails(props.rowData, props.rowIndex)">
        </i>
        <i
          class="fa fa-pencil info-icon"
          @click="onEdit(props.rowData, props.rowIndex)">
        </i>
        <i
          class="fa fa-minus error-icon"
          @click="onDelete(props.rowData, props.rowIndex)">
        </i>
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

import _ from 'lodash'

export default {
  name: 'model-table',
  components: {
    Vuetable,
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
      let tableDataComputed = _.cloneDeep(this.tableData)
      let arrayDates = []
      for (let [key, value] of Object.entries(this.entityModel)) {
          if (value.type === '_Date')
            arrayDates.push(key)
      }
      let dateFilter = this.$options.filters.date
      for (let i = 0; i < tableDataComputed.length; i++) {
        for (let j = 0; j < arrayDates.length; j++) {
          let dateOld = tableDataComputed[i][arrayDates[j]]
          let formattedDate = dateFilter(dateOld)
          tableDataComputed[i][arrayDates[j]] = formattedDate
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
