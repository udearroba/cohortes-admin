<template>
<div>
  <rich-table
  :tableData="this.data"
  />
  <vuetable-pagination
  ref="pagination"
  :numberOfPages="numberOfPages"
  @pageChanged="onPageChanged"
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
      let rtrnArr = []
      for (let index = 0; index < 5; index++) {
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
      let finalArr = []
      for (let index = 0; index < 7; index++) {
        let copy = _.map(rtrnArr, _.clone)
        finalArr.push(copy)
      }

      finalArr[0][3].title = 'test :)'
      finalArr[0][3].info = 'This is a test text :D'
      finalArr[4][4].info = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D187269647962180&imgrefurl=https%3A%2F%2Fes-la.facebook.com%2FIMG-International-Marketing-Group-Cebu-City-187269647962180%2Freviews%2F%3Freferrer%3Dpage_recommendations_see_all&docid=0B0BfM49CbYX6M&tbnid=i_w0LxvlW_b-wM%3A&vet=10ahUKEwiu852w1c_lAhUoc98KHY8JCHsQMwhMKAEwAQ..i&w=960&h=640&bih=803&biw=1707&q=img&ved=0ahUKEwiu852w1c_lAhUoc98KHY8JCHsQMwhMKAEwAQ&iact=mrc&uact=8'

      // let rtd = richTableData.getData()
      return richTableData.getData()

      // console.log(finalArr)

      // return new Promise(resolve => {
      //   setTimeout(()=>{
      //     resolve(finalArr)
      //   }, 300)
      // })

    },
    onClick() {
      this.$refs.pagination.logNumberOfPages()
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
