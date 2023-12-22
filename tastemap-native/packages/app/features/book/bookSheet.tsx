import {
  CreateBookRequestBody,
  UpdateBookRequestBody,
} from '../../../../apps/next/pages/api/book/interface'
import { useLedgerOperation, createWithCloseSheet } from './utils'
import { YStack, Text, Button, Input, Sheet } from '@my/ui'
import { useIsSheetOpen } from 'app/atoms/isSheetOpen'
import { patchApi, postApi } from 'app/utils/fetch'
import { formatDateThai } from 'app/utils/date'
import { useEffect, useState } from 'react'
import { SolitoImage } from 'solito/image'
import { useMutation } from 'react-query'
import { BookRefetch } from './core'

export const BookSheet = ({ refetch }: { refetch: BookRefetch }) => {
  const [isSheetOpen, setIsSheetOpen] = useIsSheetOpen()

  useEffect(() => {
    setIsSheetOpen(false)
  }, [])

  return (
    <Sheet
      modal
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
      animation="stillFastButNotTooFastIdk"
      snapPoints={[95]}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <Sheet.Frame
        ai="center"
        jc="center"
        paddingTop={20}
        paddingBottom={44}
        paddingLeft={16}
        paddingRight={16}
        backgroundColor="#FFF"
      >
        <Sheet.Handle />
        <YStack
          display="flex"
          position="relative"
          width="100%"
          height="100%"
          flexDirection="column"
          alignItems="center"
          gap={18}
          flexShrink={0}
          borderRadius={20}
        >
          <BookSheetTop />
          <YStack
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            flexGrow={1}
            alignSelf="stretch"
          >
            <BookSheetContent />
            <BookSheetBottom refetch={refetch} />
          </YStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}

const BookSheetTop = () => {
  const [, setIsSheetOpen] = useIsSheetOpen()
  const [ledgerOperation] = useLedgerOperation()

  return (
    <YStack
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={60}
      alignSelf="stretch"
    >
      <YStack
        display="flex"
        flexDirection="row"
        paddingVertical={7}
        paddingHorizontal={14}
        justifyContent="center"
        alignItems="center"
        gap={6}
        borderRadius={99}
        backgroundColor="#F6F4ED"
      >
        <Text
          color="#6F6F6F"
          textAlign="center"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="500"
          letterSpacing={0.16}
        >
          {ledgerOperation.action === 'EDIT'
            ? formatDateThai(new Date(ledgerOperation.date))
            : formatDateThai(new Date())}
        </Text>
        <SolitoImage
          src={require('../../assets/calendar.png')}
          width={18}
          height={18}
          contentFit="cover"
          alt="calendar"
          onLayout={() => {}}
          resizeMode="cover"
        />
      </YStack>
      <Button
        position="absolute"
        height="auto"
        padding={0}
        borderWidth={0}
        outlineWidth={0}
        backgroundColor="#FFF"
        alignSelf="flex-end"
        hoverStyle={{
          backgroundColor: '#FFF',
        }}
        pressStyle={{
          backgroundColor: '#FFF',
        }}
        onPress={() => {
          setIsSheetOpen(false)
        }}
        overflow="hidden"
      >
        <SolitoImage
          src={require('../../assets/x-mark.png')}
          width={19}
          height={19}
          contentFit="cover"
          alt="close"
          onLayout={() => {}}
          resizeMode="cover"
        />
      </Button>
    </YStack>
  )
}

const BookSheetContent = () => {
  const [ledgerOperation, setLedgerOperation] = useLedgerOperation()

  const handleAmountChange = (amount: string) => {
    const numberRegex = /^\d+$/
    return (
      (numberRegex.test(amount) || amount.length === 0) &&
      setLedgerOperation((ledgerOperation) => {
        return {
          ...ledgerOperation,
          amount: amount,
        }
      })
    )
  }

  return (
    <YStack
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={22}
      alignSelf="stretch"
    >
      <YStack
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={6}
        alignSelf="stretch"
      >
        <Text
          color="#3F3F3F"
          fontFamily="$body"
          fontSize={20}
          fontStyle="normal"
          fontWeight="700"
          letterSpacing={0.2}
        >
          {ledgerOperation.type === 'INCOME' ? 'รายรับ' : 'รายจ่าย'}
          {ledgerOperation.type === 'EXPENSE' && (
            <Text
              color="#EB5E2A"
              fontFamily="$body"
              fontSize={18}
              fontStyle="normal"
              fontWeight="700"
              letterSpacing={0.18}
            >
              *
            </Text>
          )}
        </Text>
        {ledgerOperation.type === 'INCOME' ? (
          <YStack
            height={40}
            width="100%"
            backgroundColor="#F6F4ED"
            hoverStyle={{
              backgroundColor: '#F6F4ED',
            }}
            pressStyle={{
              backgroundColor: '#F6F4ED',
            }}
            alignItems="center"
            justifyContent="center"
            paddingHorizontal={16}
            borderRadius={10}
          >
            <Text display="flex" alignItems="center" alignSelf="stretch">
              รายรับจากการขาย
            </Text>
          </YStack>
        ) : (
          <ExpenseDropDown />
        )}
      </YStack>
      <YStack
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={6}
        alignSelf="stretch"
      >
        <YStack display="flex" flexDirection="row">
          <Text
            color="#3F3F3F"
            fontFamily="$body"
            fontSize={18}
            fontStyle="normal"
            fontWeight="500"
            letterSpacing={0.18}
          >
            {ledgerOperation.type === 'INCOME' ? 'ได้มา(บาท)' : 'จ่ายไปทั้งหมด(บาท)'}
          </Text>
          <Text
            color="#EB5E2A"
            fontFamily="$body"
            fontSize={18}
            fontStyle="normal"
            fontWeight="500"
            letterSpacing={0.18}
          >
            *
          </Text>
        </YStack>
        <Input
          display="flex"
          value={ledgerOperation.amount}
          onChangeText={handleAmountChange}
          height={40}
          paddingVertical={0}
          paddingHorizontal={16}
          alignItems="center"
          gap={10}
          alignSelf="stretch"
          borderRadius={10}
          backgroundColor="#F6F4ED"
          outlineWidth={0}
          borderWidth={0}
          focusStyle={{
            outlineWidth: 0,
            borderWidth: 0,
          }}
          keyboardType="numeric"
        />
      </YStack>
    </YStack>
  )
}

const BookSheetBottom = ({ refetch }: { refetch: BookRefetch }) => {
  const [, setIsSheetOpen] = useIsSheetOpen()
  const [ledgerOperation, setLedgerOperation] = useLedgerOperation()
  const { mutateAsync: mutateCreateAsync } = useMutation((body: CreateBookRequestBody) =>
    postApi('/book/create', body)
  )

  const { mutateAsync: mutateUpdateAsync } = useMutation((body: UpdateBookRequestBody) =>
    patchApi('/book/update', body)
  )

  const withCloseSheet = createWithCloseSheet(setIsSheetOpen)

  type BindedMutate = () => Promise<{ data: any; error: null } | { data: null; error: any }>
  const partialOnCreateOrUpdate = (bindedMutate: BindedMutate) => async () => {
    const successResponse = await bindedMutate()
    if (successResponse.error) {
      console.error(successResponse.error)
    }

    withCloseSheet(() => {
      setLedgerOperation((ledgerOperation) => {
        return {
          ...ledgerOperation,
          amount: '',
          category: '',
        }
      })
      refetch()
    })
  }
  const onCreate = partialOnCreateOrUpdate(() =>
    mutateCreateAsync(
      CreateBookRequestBody.parse({
        type: ledgerOperation.type,
        category: ledgerOperation.category,
        amount: ledgerOperation.amount,
      })
    )
  )
  const onUpdate = partialOnCreateOrUpdate(() =>
    mutateUpdateAsync(
      UpdateBookRequestBody.parse({
        id: ledgerOperation.id,
        type: ledgerOperation.type,
        category: ledgerOperation.category,
        amount: ledgerOperation.amount,
      })
    )
  )

  return (
    <YStack display="flex" alignItems="flex-start" flexDirection="row" gap={22}>
      <Button
        display="flex"
        width={100}
        paddingVertical={8}
        paddingHorizontal={24}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={10}
        borderRadius={24}
        backgroundColor="#FFD14E"
        hoverStyle={{
          backgroundColor: '#FFD14E',
        }}
        pressStyle={{
          backgroundColor: '#FFD14E',
        }}
        onPress={ledgerOperation.action === 'ADD' ? onCreate : onUpdate}
      >
        <Text
          color="#82630E"
          textAlign="center"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="700"
          letterSpacing={0.16}
        >
          เพิ่ม
        </Text>
      </Button>
      <Button
        display="flex"
        width={100}
        paddingVertical={8}
        paddingHorizontal={24}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={10}
        borderRadius={24}
        backgroundColor="#F6F4ED"
        hoverStyle={{
          backgroundColor: '#F6F4ED',
        }}
        pressStyle={{
          backgroundColor: '#F6F4ED',
        }}
        onPress={() => setIsSheetOpen(false)}
      >
        <Text
          color="#6F6F6F"
          textAlign="center"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="500"
          letterSpacing={0.16}
        >
          ยกเลิก
        </Text>
      </Button>
    </YStack>
  )
}

const ExpenseDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [ledgerOperation, setLedgerOperation] = useLedgerOperation()

  const items = ['ค่าเดินทาง', 'ค่าต้นทุนสินค้า', 'ค่าเช่าที่', 'อื่นๆ']

  const setValAndClose = (val: string) => {
    setLedgerOperation((ledgerOperation) => {
      return {
        ...ledgerOperation,
        category: val,
      }
    })
    setIsOpen(false)
  }

  return (
    <>
      <Button
        display="flex"
        width="100%"
        flexDirection="row"
        alignItems="center"
        borderWidth={1}
        borderRadius={10}
        paddingHorizontal={16}
        height={40}
        borderColor="#D9D9D9"
        onPress={() => setIsOpen((o) => !o)}
        backgroundColor="#FFF"
        hoverStyle={{
          backgroundColor: '#FFF',
          borderColor: '#D9D9D9',
        }}
        pressStyle={{
          backgroundColor: '#FFF',
          borderColor: '#D9D9D9',
        }}
      >
        <Text
          color="#6F6F6F"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="400"
          letterSpacing={0.16}
        >
          {ledgerOperation.category}
        </Text>
        <YStack marginLeft="auto">
          <SolitoImage
            src={isOpen ? require('../../assets/up.png') : require('../../assets/down.png')}
            width={8}
            height={4}
            contentFit="cover"
            alt="calendar"
            onLayout={() => {}}
            resizeMode="cover"
          />
        </YStack>
      </Button>
      {isOpen && (
        <YStack
          animation="lazy"
          display="flex"
          width="100%"
          flexDirection="column"
          alignItems="flex-start"
          borderRadius={10}
          backgroundColor="#FFF"
          borderColor="#D9D9D9"
          borderWidth={1}
          overflow="hidden"
        >
          {items.map((item, i) => (
            <Button
              key={i}
              display="flex"
              justifyContent="flex-start"
              paddingVertical={10}
              paddingHorizontal={16}
              gap={3}
              alignSelf="stretch"
              backgroundColor="#FFF"
              onPress={() => setValAndClose(item)}
              hoverStyle={{
                backgroundColor: '#F6F4ED',
              }}
              pressStyle={{
                backgroundColor: '#F6F4ED',
              }}
            >
              <Text
                key={i}
                color="#6F6F6F"
                fontFamily="$body"
                fontSize={16}
                fontStyle="normal"
                fontWeight="400"
                letterSpacing={0.16}
              >
                {item}
              </Text>
            </Button>
          ))}
        </YStack>
      )}
    </>
  )
}
