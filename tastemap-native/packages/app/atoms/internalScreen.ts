import { atom, useAtom } from 'jotai'

type InternalScreen = 'book' | 'dashboard' | 'account'
const internalScreenAtom = atom<InternalScreen>('book')

export function useInternalScreen() {
  return [...useAtom(internalScreenAtom)] as const
}
