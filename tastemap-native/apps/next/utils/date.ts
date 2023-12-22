export const timestampToISOString = (timestamp: number) => {
  return new Date(timestamp * 1000).toISOString()
}

export const getStartAndEndOfTodayThailandTime = () => {
  const today = new Date()
  const thailandOffset = 7 * 60
  const localOffset = today.getTimezoneOffset()
  const offsetInMs = (thailandOffset + localOffset) * 60 * 1000

  const startOfDayUtc = new Date(today.setHours(0, 0, 0, 0))
  const endOfDayUtc = new Date(today.setHours(23, 59, 59, 999))

  const startOfTodayThailand =
    new Date(startOfDayUtc.getTime() + offsetInMs).toISOString().split('T')[0] + 'T00:00:00+07:00'
  const endOfTodayThailand =
    new Date(endOfDayUtc.getTime() + offsetInMs).toISOString().split('T')[0] + 'T23:59:59+07:00'

  return { startOfTodayThailand, endOfTodayThailand }
}
