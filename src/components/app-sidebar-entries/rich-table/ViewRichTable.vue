<template>
<div>
  <vuetable-pagination
  ref="pagination"
  :numberOfPages="numberOfPages"
  @pageChanged="onPageChanged"
  />
  <rich-table
  :tableData="this.data"
  />
</div>
</template>

<script>
import Vue from 'vue'
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
    getData() {
      return richTableData.getData()
    },
    onPageChanged(page) {
      this.data = this.rtController.getDataPerPage(page)
    }
  },
  async created() {
    let res = await this.getData()
    this.rtController = new RichTableController(res, 2)
    this.numberOfPages = this.rtController.getNumberOfPages()
    this.data = this.rtController.getDataPerPage(1)
  }
}
</script>
