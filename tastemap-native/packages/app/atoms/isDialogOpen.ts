import { Dispatch, SetStateAction } from 'react'
import { atom, useAtom } from 'jotai'

const isDialogOpenAtom = atom<boolean>(false)

export function useIsDialogOpen() {
  return [...useAtom(isDialogOpenAtom)] as const
}

export const createWithDiaglogOpen =
  (setIsDiaglogOpen: Dispatch<SetStateAction<boolean>>) => (callback: () => void) => {
    callback()
    setIsDiaglogOpen(true)
  }
export const createWithDiaglogClose =
  (setIsDiaglogOpen: Dispatch<SetStateAction<boolean>>) => (callback: () => void) => {
    callback()
    setIsDiaglogOpen(false)
  }
