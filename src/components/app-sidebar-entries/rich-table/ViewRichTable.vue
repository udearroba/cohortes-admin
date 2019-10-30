<template>
<div>
  <rich-table/>
  <vuetable-pagination
    ref="pagination"
  />
</div>
</template>

<script>
import Vue from 'vue'

import RichTable from './RichTable'
import VuetablePagination from '../VuetablePagination'

export default {
  name: 'view-rich-table',
  components: {
    RichTable,
    VuetablePagination,
  },
}
</script>
