const padZero = (number: number) => number.toString().padStart(2, '0')

export const formatDate = (date: Date) => {
  // ISO8601 standard
  const year = date.getFullYear()
  const month = padZero(date.getMonth() + 1)
  const day = padZero(date.getDate())

  return `${year}-${month}-${day}`
}

export const formatDateThai = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    calendar: 'buddhist',
  }

  const formattedDate = new Intl.DateTimeFormat('th-TH', options).format(date)
  return `วันที่ ${formattedDate}`
}
