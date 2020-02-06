<template>
<div>
  <vuetable-pagination
  class="pagination-class"
  ref="pagination"
  :numberOfPages="numberOfPages"
  @pageChanged="onPageChanged"
  />
  <template v-if="this.data">
    <rich-table-2
    :tableData = this.data
    />
  </template>
</div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'

import RichTable2 from './RichTable2'
import VuetablePagination from '../VuetablePagination'

import richTableData from '../../../services/richTableData.service'
import RichTableController from '../../../controllers/richTable.controller.class'

export default {
  name: 'view-rich-table',
  components: {
    RichTable2,
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
    getData(limit) {
      return richTableData.getData2(limit)
    },
    onPageChanged(page) {
      this.data = this.rtController.getDataPerPage(page)
    }
  },
  async created() {
    //el parámetro de getData es el número de reuniones a traer
    let data = await this.getData(1)
    // this.rtController = new RichTableController(res, 2)
    // this.numberOfPages = this.rtController.getNumberOfPages()
    this.data = data
  }
}
</script>

<style lang="scss">

  .pagination-class {
   margin-bottom: 30px;
  }

</style>
