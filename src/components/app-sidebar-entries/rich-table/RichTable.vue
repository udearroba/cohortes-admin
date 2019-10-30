<template>
  <div class="element-row-container">
    <table-element-row
    class="table-element-row"
    v-for="(item, index) in tableRowIterable"
    :key="index"
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
  data () {
    return {
      numberRows: 3
    }
  },
  methods: {

  },
  computed: {
    tableRowIterable (){
      return [...Array(this.numberRows).keys()]
    }
  },
  beforeCreate () {

  },
  created () {

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
