import { useLedgerOperation, createWithOpenSheet, LedgerType } from './utils'
import { useIsSheetOpen } from 'app/atoms/isSheetOpen'
import { YStack, Text, Button } from '@my/ui'

export const CoreBookEmpty = () => {
  const [, setIsSheetOpen] = useIsSheetOpen()
  const [, setLedgerOperation] = useLedgerOperation()
  const withOpenSheet = createWithOpenSheet(setIsSheetOpen)

  const createHandlePressOf = (ledgerType: LedgerType) => {
    return () =>
      withOpenSheet(() => {
        setLedgerOperation((ledgerOperation) => {
          return {
            ...ledgerOperation,
            type: ledgerType,
            action: 'ADD',
          }
        })
      })
  }

  return (
    <YStack display="flex" width={358} flexDirection="column" alignItems="center" gap={27}>
      <Text
        width={182}
        color="#9A978E"
        textAlign="center"
        fontFamily="$body"
        fontSize={16}
        fontStyle="normal"
        fontWeight="500"
        letterSpacing={0.16}
      >
        ยังไม่มีข้อมูล โปรดกดเพิ่ม การบันทึกรายรับรายจ่าย
      </Text>
      <YStack
        display="flex"
        padding={30}
        flexDirection="column"
        alignItems="center"
        gap={14}
        alignSelf="stretch"
        borderRadius={20}
        backgroundColor="#FFF"
      >
        <Button
          display="flex"
          width={270}
          paddingVertical={10}
          justifyContent="center"
          alignItems="center"
          gap={10}
          borderRadius={20}
          backgroundColor="#33BFBE"
          hoverStyle={{
            backgroundColor: '#33BFBE',
          }}
          pressStyle={{
            backgroundColor: '#33BFBE',
          }}
          onPress={createHandlePressOf('INCOME')}
        >
          <Text
            color="#FFF"
            fontFamily="$body"
            fontSize={16}
            fontStyle="normal"
            fontWeight="700"
            letterSpacing={0.16}
          >
            บันทึกรายรับ
          </Text>
        </Button>
        <Button
          display="flex"
          width={270}
          paddingVertical={10}
          justifyContent="center"
          alignItems="center"
          gap={10}
          borderRadius={20}
          backgroundColor="#FFD14E"
          hoverStyle={{
            backgroundColor: '#FFD14E',
          }}
          pressStyle={{
            backgroundColor: '#FFD14E',
          }}
          onPress={createHandlePressOf('EXPENSE')}
        >
          <Text
            color="#82630E"
            fontFamily="$body"
            fontSize={16}
            fontStyle="normal"
            fontWeight="700"
            letterSpacing={0.16}
          >
            บันทึกรายจ่าย
          </Text>
        </Button>
      </YStack>
    </YStack>
  )
}
