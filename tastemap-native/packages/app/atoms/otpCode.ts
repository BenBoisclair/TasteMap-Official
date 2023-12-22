import { atom, useAtom } from 'jotai'

export type OtpCode = [string, string, string, string, string, string]
const otpCodeAtom = atom<OtpCode>(['', '', '', '', '', ''])

export function useOtpCode() {
  return [...useAtom(otpCodeAtom)] as const
}
