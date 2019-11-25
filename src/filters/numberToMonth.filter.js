export default (monthNumber) => {

  if (monthNumber<1 || monthNumber>12) {
    return null
  }

  let months = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

  return months[monthNumber]
}
