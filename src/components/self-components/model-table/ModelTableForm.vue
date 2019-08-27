<template>
  <vuetable
    ref="vuetable"
    :api-mode="false"
    :fields="tableFieldsComputed"
    :css="css.table"
    :data="tableData"
  >
  <template slot="actions" scope="props">
      <div class="custom-actions">
      <i v-if="!noLinkAction"
          class="fa fa-eye"
          @click="onShowTable(props.rowData, props.rowIndex)">
        </i>
        <i v-if="!noLinkAction"
          class="fa fa-arrow-circle-right"
          @click="onDetails(props.rowData, props.rowIndex)">
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
    onShowTable(data, index) {
      this.$emit('showClicked', data, index)
    },
    onDetails(data, index) {
      this.$emit('detailsClicked', data, index)
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
    }
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
