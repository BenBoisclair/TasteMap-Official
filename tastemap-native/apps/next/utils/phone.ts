export const paddedCountryCode = (phone_number: string) => {
  return `66${phone_number.slice(1, phone_number.length)}`
}

export const unpaddedCountryCode = (phone_number: string) => {
  return `0${phone_number.slice(2, phone_number.length)}`
}
