<template>
<div>
  <template v-if="this.numberOfPages">
    <vuetable-pagination
    class="pagination-class"
    ref="pagination"
    :numberOfPages="numberOfPages"
    @pageChanged="onPageChanged"
    />
  </template>
  <template v-if="this.data">
    <rich-table
    :tableData = this.data
    />
  </template>
  <template v-else>
    <p>Cargando...</p>
  </template>
  
</div>
</template>

<script>
import _ from 'lodash'

import RichTable from './RichTable'
import VuetablePagination from '../VuetablePagination'

import richTableData from '../../../services/richTableData.service'
import RichTableController from '../../../controllers/richTable.controller.class'

export default {
  name: 'view-rich-table',
  components: {
    RichTable,
    VuetablePagination,
  },
  data() {
    return {
      data: null,
      numberOfPages: null,
      rtController: null,
    }
  },
  methods: {
    getData(limit, page) {
      this.data = null
      return this.rtController.getDataPerPage(page)
    },
    async onPageChanged(page) {
      this.data = null
      let limit = 1
      this.data = await this.getData(limit, page)
    },
    // later(delay) {
    // return new Promise(function(resolve) {
    //   setTimeout(resolve, delay)
    //   });
    // },
  },
  async created() {
    let numeroReuniones = await richTableData.getReunionesCount()
    // await this.later(2000)
    this.rtController = new RichTableController(numeroReuniones)
    this.numberOfPages = this.rtController.getNumberOfPages()
    let data = await this.getData(1, 1)
    this.data = data
  },
  
}
</script>

<style lang="scss">

  .pagination-class {
   margin-bottom: 30px;
  }

</style>
