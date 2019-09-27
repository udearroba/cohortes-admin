export default (value) => {
  let formattedValue = value + ' B';
  if(value > 10**3 && value < 10**6) {
    formattedValue = value/1000 + ' KB'
  } else if(value > 10**6 && value < 10**9) {
    formattedValue = value/(10**6) + ' MB'
  } else if(value > 10**9 && value < 10**12) {
    formattedValue = value/(10**9) + ' GB'
  }
  return formattedValue
}
