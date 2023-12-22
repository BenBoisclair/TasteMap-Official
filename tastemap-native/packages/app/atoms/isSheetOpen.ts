import { atom, useAtom } from 'jotai'

const isSheetOpenAtom = atom<boolean>(false)

export function useIsSheetOpen() {
  return [...useAtom(isSheetOpenAtom)] as const
}
