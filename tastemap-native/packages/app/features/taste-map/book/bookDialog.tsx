import { YStack, Text, Button, AlertDialog } from '@my/ui'
import { useIsDialogOpen } from 'app/atoms/isDialogOpen'
import { deleteApi } from 'app/utils/fetch'
import { useMutation } from 'react-query'
import { BookRefetch } from './core'
import { useLedgerOperation } from './utils'

export const BookDialog = ({ refetch }: { refetch: BookRefetch }) => {
  const [ledgerOperation] = useLedgerOperation()
  const [isDialogOpen, setIsDiaglogOpen] = useIsDialogOpen()
  const { mutateAsync } = useMutation((id: number) =>
    deleteApi(`/book/delete?id=${encodeURIComponent(id)}`)
  )

  const onDelete = async () => {
    setIsDiaglogOpen(false)
    const deleteResponse = await mutateAsync(ledgerOperation.id)
    if (deleteResponse.error) {
      // do something
    }
    await refetch()
  }

  return (
    <AlertDialog>
      <AlertDialog.Portal forceMount={isDialogOpen ? true : undefined} padding={0} borderWidth={0}>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          padding={0}
          borderWidth={0}
        />
        <AlertDialog.Content
          x={0}
          y={0}
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          padding={0}
          borderWidth={0}
          outlineWidth={0}
        >
          <YStack
            display="flex"
            width={358}
            paddingVertical={26}
            paddingHorizontal={20}
            flexDirection="column"
            alignItems="center"
            gap={24}
            borderRadius={10}
            backgroundColor="#FFF"
          >
            <Text
              color="#3F3F3F"
              fontFamily="$body"
              fontSize={20}
              fontStyle="normal"
              fontWeight="600"
              letterSpacing={0.2}
            >
              คุณต้องการลบรายการนี้ใช้หรือไม่
            </Text>
            <YStack
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="flex-start"
              gap={16}
              alignSelf="stretch"
            >
              <Button
                display="flex"
                paddingVertical={8}
                paddingHorizontal={24}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                borderRadius={24}
                backgroundColor="#F6F4ED"
                borderWidth={0}
                outlineWidth={0}
                pressStyle={{
                  borderWidth: 0,
                  outlineWidth: 0,
                  backgroundColor: '#F6F4ED',
                }}
                onPress={onDelete}
              >
                <Text
                  color="#6F6F6F"
                  textAlign="center"
                  fontFamily="$body"
                  fontSize={16}
                  fontStyle="normal"
                  fontWeight="400"
                  letterSpacing={0.16}
                >
                  ยืนยัน
                </Text>
              </Button>
              <Button
                display="flex"
                paddingVertical={8}
                paddingHorizontal={24}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                borderRadius={24}
                backgroundColor="#FFD14E"
                borderWidth={0}
                outlineWidth={0}
                pressStyle={{
                  borderWidth: 0,
                  outlineWidth: 0,
                  backgroundColor: '#FFD14E',
                }}
                onPress={() => setIsDiaglogOpen(false)}
              >
                <Text
                  color="#82630E"
                  textAlign="center"
                  fontFamily="$body"
                  fontSize={16}
                  fontStyle="normal"
                  fontWeight="600"
                  letterSpacing={0.16}
                >
                  ยกเลิก
                </Text>
              </Button>
            </YStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
