export default (_value) => {
  let value = +_value

  let hours = value/3600
  hours = Math.trunc(hours)
  value = value-(3600*hours)

  let minutes = value/60
  minutes = Math.trunc(minutes)
  value = value-(60*minutes)

  let seconds = value

  if(hours<10) {
    hours = '0'+hours
  }
  if(minutes<10) {
    minutes = '0'+minutes
  }
  if(seconds<10) {
    seconds = '0'+seconds
  }

  let formattedDuration = `${hours}:${minutes}:${seconds}`

  return formattedDuration
}
