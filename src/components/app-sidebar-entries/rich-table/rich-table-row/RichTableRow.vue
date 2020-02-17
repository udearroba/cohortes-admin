<template>
  <div class="table-grid-container">
    <div
    class="table-element"
    v-for="(data, index) in rowData"
    :key="index">
      <table-element-content
      :data="data"/>
    </div>
  </div>
</template>

<script>
import TableElementContent from '../table-element-content/TableElementContent'

export default {
  name: 'rich-table-row',
  components: {
    TableElementContent,
  },
  props: {
// [
//    {
//       "title":"idsistemaexterno",
//       "info":"15465",
//       "extra":{
//          "alias":"Id sistema externo"
//       }
//    },
//    {
//       "title":"estadodescarga",
//       "info":"ZOOM",
//       "extra":{
//          "alias":"Almacenado en",
//          "needed":true,
//          "format":"status",
//          "status":[
//             "ZOOM",
//             "DRIVE"
//          ]
//       }
//    }
// ]
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
