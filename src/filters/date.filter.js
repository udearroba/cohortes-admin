export default (value) => {
  const date = new Date(value)

  let months = [
    'Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic']

  const _minutes = date.getMinutes()
  const _hours = date.getHours()
  const day = date.getDate()
  const _month = date.getMonth()
  const month = months[_month]
  const year = date.getFullYear()

  // FORMATO A LAS HORAS ---
  let acronym = 'AM'
  let hours = _hours
  if(_hours>12) {
    hours = _hours-12
    acronym = 'PM'
  }
  else if(_hours==12) {
    acronym = 'PM'
  }
  else if(_hours==0) {
    hours = 12
    acronym = 'AM'
  }
  // ---

  // FORMATO A LOS MINUTOS ---
  let minutes = _minutes
  if(_minutes<10) {
    minutes = `0${_minutes}`
  }
  // ---
  let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} ${acronym}`

  return formattedDate
}
