class UserExceptionHandler {

  static getUserError(error) {
    let comment = error.comment
    let details = error.details
    let fieldName = error.fieldName

    if(comment=="missing field") {
      return `Ingrese un valor en ${fieldName}`
    }
    else if(comment=="max char reached") {
      return `Ingrese solo ${details.charLimit} caracteres en ${fieldName}`
    }
    else if(comment=="wrong format") {
      return `Ingrese ${fieldName} con el formato correcto`
    }
  }
}

export default UserExceptionHandler
