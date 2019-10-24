<template>
  <div class="table-grid-container">
    <div
    class="table-element"
    v-for="(item, index) in itemsIterable"
    :key="index">
      <table-element-content
      :title="item.title"
      :info="item.info"
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
  data () {
    return {
      numberItems: 10
    }
  },
  methods: {

  },
  computed: {
    itemsIterable (){
      let rtrnArr = []
      for (let index = 0; index < this.numberItems; index++) {
        let element = {}
        if (index%2 == 0) {
          element.title = 'Perro'
          element.info = 'El perro es el mejor amigo del hombre'
        } else {
          element.title = 'Gato'
          element.info = 'La compañía felina perfecta'
        }
        rtrnArr.push(element)
      }
      return rtrnArr
      // return [...Array(this.numberItems).keys()]
    }
  },
  beforeCreate () {

  },
  created () {

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
