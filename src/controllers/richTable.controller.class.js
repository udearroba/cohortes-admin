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
    this.paginatedData = _.chunk(this.rawData, this.registerPerPage);
  }

  getNumberOfPages() {
    return this.numberOfPages
  }

  getPaginatedData() {
    return this.paginatedData
  }

  getDataPerPage(page) {
    return this.paginatedData[page-1]
  }
}

export default RichTableController
