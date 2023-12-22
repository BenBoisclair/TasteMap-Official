import { OtpCode } from 'app/atoms/otpCode'
import { Dispatch, SetStateAction, MutableRefObject } from 'react'
import { TextInput } from 'react-native'

export type TextInputOrNull = TextInput | null
export type OtpIndexRange = 0 | 1 | 2 | 3 | 4 | 5
export type OtpRange = OtpIndexRange | 6
export type OtpCodeRefs = [
  TextInputOrNull,
  TextInputOrNull,
  TextInputOrNull,
  TextInputOrNull,
  TextInputOrNull,
  TextInputOrNull
]

export const partialGetOtpIndex = (otpCode: OtpCode) => {
  return () => otpCode.filter((code) => code !== '').length as OtpRange
}

const parseOtpRange = (num: number) => {
  const validateOtpRange = (num: number) => {
    if (!(6 >= num && num >= 0)) {
      throw Error(`Otp Index must be between 0 and 6, instead got ${num}`)
    }
    return num as OtpIndexRange
  }

  return validateOtpRange(Math.max(Math.min(num, 6), 0))
}

const partialGetParsedOtpIndex = (otpCode: OtpCode) => {
  return () => parseOtpRange(partialGetOtpIndex(otpCode)())
}

const otpIsNumber = (code: string) => {
  const onlyNumberRegex = /^\d+$/
  return onlyNumberRegex.test(code) || code === ''
}

export const createOtpHandler = (
  otpCode: OtpCode,
  setOtpCode: Dispatch<SetStateAction<OtpCode>>
) => {
  const getOtpIndex = partialGetOtpIndex(otpCode)
  const getParsedOtpIndex = partialGetParsedOtpIndex(otpCode)

  const setOtpCodeAtLocation = (code: string, index: OtpRange) => {
    setOtpCode(
      (prevOtpCode) =>
        prevOtpCode.map((prevCode, i) =>
          i === index && otpIsNumber(code) ? code : prevCode
        ) as OtpCode
    )
  }

  const setOtp = (code: string) => setOtpCodeAtLocation(code, getParsedOtpIndex())
  const removeOtp = () => setOtpCodeAtLocation('', parseOtpRange(getOtpIndex() - 1))

  return [setOtp, removeOtp] as const
}

export const createOtpNavigationHandler = (otpCode: OtpCode) => {
  const getOtpIndex = partialGetOtpIndex(otpCode)
  const getParsedOtpIndex = partialGetOtpIndex(otpCode)

  const current = () => (getParsedOtpIndex() - 1) as OtpIndexRange
  const next = () => (current() + 1) as OtpRange

  const navigate = (
    refs: MutableRefObject<OtpCodeRefs>,
    navigateToNextPage: () => Promise<void>
  ) => {
    const unfocus = () => {
      ;(refs.current[current()] as TextInput).blur()
    }
    const focusOn = (fn: () => number) => {
      return () => (refs.current[fn()] as TextInput).focus()
    }
    const focusOnNext = focusOn(next)

    switch (getOtpIndex()) {
      case 6:
        unfocus()
        navigateToNextPage()
        break
      default:
        focusOnNext()
        break
    }
  }
  return navigate
}
