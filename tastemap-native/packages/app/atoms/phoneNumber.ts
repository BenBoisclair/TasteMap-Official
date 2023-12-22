import { atom, useAtom } from 'jotai'

const phoneNumberAtom = atom('')

export function usePhoneNumber() {
  return [...useAtom(phoneNumberAtom)] as const
}
