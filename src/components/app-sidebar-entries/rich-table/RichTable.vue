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
      // let rtrnArr = []
      // for (let index = 0; index < this.numberItems; index++) {
      //   let element = {}
      //   if (index%2 == 0) {
      //     element.title = 'Perro'
      //     element.info = 'El perro es el mejor amigo del hombre'
      //   } else {
      //     element.title = 'Gato'
      //     element.info = 'La compañía felina perfecta'
      //   }
      //   rtrnArr.push(element)
      // }
      // return rtrnArr
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
