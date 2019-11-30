<template>
  <div class="table-grid-container">
    <div
    class="table-element"
    v-for="(data, index) in rowData"
    :key="index">
      <table-element-content
      :data="data"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TableElementContent from '../table-element-content/TableElementContent'

export default {
  name: 'rich-table-row',
  components: {
    TableElementContent,
  },
  props: {
    rowData: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data () {
    return {
      numberItems: 10
    }
  },
}

</script>

<style lang="scss" scoped>

  $element-background-color: $charcoal;

  .table-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
    // width: 100%;
  }
  .table-element {
    background-color: $element-background-color;
    // border-style: solid;
    // border-color: black;
    margin: 1px;
    // border-radius: 6px;
    min-height: 100px;
  }

</style>
