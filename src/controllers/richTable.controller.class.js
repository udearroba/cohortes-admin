import richTableData from '../services/richTableData.service'

class RichTableController {

  numberOfPages
  registerPerPage

  constructor(numberOfPages) {
    this.registerPerPage = 1
    this.numberOfPages = numberOfPages
  }

  getNumberOfPages() {
    return this.numberOfPages
  }

  async getDataPerPage(page) {
    // return this.paginatedData[page-1]
    let data = await richTableData.getData(1, page-1)
    return data
  }
}

export default RichTableController
