import axios from 'axios'
import apiRoutes from '../services/apiRoutes'
import _ from 'lodash'

class RichTableController {

  rawData = []
  paginatedData = []
  numberOfPages
  registerPerPage

  constructor(data, registerPerPage) {
    this.rawData = data
    this.registerPerPage = registerPerPage ? registerPerPage : 2
    this.numberOfPages = Math.ceil(data.length / registerPerPage)

    this.paginateData()
  }

  paginateData() {
    this.paginatedData = _.chunk(this.rawData, this.numberOfPages);
    // console.log(this.paginatedData)
  }

  getNumberOfPages() {
    return this.numberOfPages
  }
}

export default RichTableController
