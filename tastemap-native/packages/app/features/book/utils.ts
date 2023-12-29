import { atom, useAtom } from 'jotai'
import { Dispatch, SetStateAction } from 'react'
import { formatDate } from 'app/utils/date'

export type LedgerType = 'INCOME' | 'EXPENSE'
export type LedgerAction = 'ADD' | 'EDIT' | 'DELETE'
export interface LedgerOperation {
  id: number
  type: LedgerType
  category: string
  action: LedgerAction
  amount: string
  date: string
}

const ledgerOperationAtom = atom<LedgerOperation>({
  id: 0,
  type: 'INCOME',
  category: 'รายรับจากการขาย',
  action: 'ADD',
  amount: '0',
  date: formatDate(new Date()),
})

export function useLedgerOperation() {
  const [ledgerOperation, setLedgerOperation] = [...useAtom(ledgerOperationAtom)] as const

  return [
    {
      ...ledgerOperation,
      category:
        ledgerOperation.category === ''
          ? ledgerOperation.type === 'INCOME'
            ? 'รายรับจากการขาย'
            : ledgerOperation.type === 'EXPENSE'
            ? 'เลือกประเภท'
            : ''
          : ledgerOperation.category,
    },
    setLedgerOperation,
  ] as const
}

export const createWithOpenSheet =
  (setIsSheetOpen: Dispatch<SetStateAction<boolean>>) => (callback: () => void) => {
    callback()
    setIsSheetOpen(true)
  }
export const createWithCloseSheet =
  (setIsSheetOpen: Dispatch<SetStateAction<boolean>>) => (callback: () => void) => {
    callback()
    setIsSheetOpen(false)
  }
export const addComma = (amount: string | number) => {
  return typeof amount === 'string' ? Number(amount).toLocaleString() : amount.toLocaleString()
}
