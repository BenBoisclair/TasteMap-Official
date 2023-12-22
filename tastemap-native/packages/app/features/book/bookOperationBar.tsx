import { useIsSheetOpen } from 'app/atoms/isSheetOpen'
import { YStack, Button, Text } from '@my/ui'
import { createWithOpenSheet, useLedgerOperation } from './utils'

export const BookOperationBar = () => {
  const [, setLedgerOperation] = useLedgerOperation()
  const [, setSheetIsOpen] = useIsSheetOpen()

  const withOpenSheet = createWithOpenSheet(setSheetIsOpen)

  const handleIncomePress = () => {
    withOpenSheet(() =>
      setLedgerOperation((ledgerOperation) => {
        return {
          ...ledgerOperation,
          action: 'ADD',
          type: 'INCOME',
        }
      })
    )
  }
  const handleExpensePress = () => {
    withOpenSheet(() =>
      setLedgerOperation((ledgerOperation) => {
        return {
          ...ledgerOperation,
          action: 'ADD',
          type: 'EXPENSE',
        }
      })
    )
  }

  return (
    <YStack
      display="flex"
      flexDirection="row"
      width="100%"
      paddingHorizontal={20}
      paddingTop={20}
      justifyContent="center"
      alignItems="flex-start"
      gap={14}
      flexShrink={0}
      borderTopLeftRadius={30}
      borderTopRightRadius={30}
      backgroundColor="#FFF"
    >
      <Button
        display="flex"
        paddingVertical={10}
        justifyContent="center"
        alignItems="center"
        gap={10}
        flexGrow={1}
        borderRadius={20}
        backgroundColor="#33BFBE"
        hoverStyle={{
          backgroundColor: '#33BFBE',
        }}
        pressStyle={{
          backgroundColor: '#33BFBE',
        }}
        onPress={handleIncomePress}
      >
        <Text
          color="#FFF"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="600"
          letterSpacing={0.16}
        >
          บันทึกรายรับ
        </Text>
      </Button>
      <Button
        display="flex"
        paddingVertical={10}
        justifyContent="center"
        alignItems="center"
        gap={10}
        flexGrow={1}
        borderRadius={20}
        backgroundColor="#FFD14E"
        hoverStyle={{
          backgroundColor: '#FFD14E',
        }}
        pressStyle={{
          backgroundColor: '#FFD14E',
        }}
        onPress={handleExpensePress}
      >
        <Text
          color="#82630E"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="600"
          letterSpacing={0.16}
        >
          บันทึกรายจ่าย
        </Text>
      </Button>
    </YStack>
  )
}
