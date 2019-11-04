<template>
  <div class="element-row-container">
    <table-element-row
    class="table-element-row"
    v-for="(rowData, index) in tableData"
    :key="index"
    :rowData="rowData"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import TableElementRow from './rich-table-row/RichTableRow'

export default {
  name: 'rich-table',
  components: {
    TableElementRow,
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data () {
    return {
      // numberRows: 3
    }
  },
}

</script>

<style lang="scss" scoped>

  .table-element-row {
    margin-top: 8px;
  }

  .element-row-container {
    width: 100%;
  }
</style>
