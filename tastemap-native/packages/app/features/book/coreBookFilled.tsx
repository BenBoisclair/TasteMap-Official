import { createWithOpenSheet, LedgerAction, useLedgerOperation, addComma } from './utils'
import { createWithDiaglogOpen, useIsDialogOpen } from 'app/atoms/isDialogOpen'
import { Book, Books } from '../../../../apps/next/pages/api/book/interface'
import { Dispatch, SetStateAction, useState } from 'react'
import { useIsSheetOpen } from 'app/atoms/isSheetOpen'
import { YStack, Text, Button } from '@my/ui'
import { SolitoImage } from 'solito/image'
import { BookToggleStatus } from './core'

type FilterOption = 'ALL' | 'INCOME' | 'EXPENSE'

export const CoreBookFilled = ({
  books,
  toggleStatus,
  setToggleStatus,
}: {
  books: Books
  toggleStatus: BookToggleStatus
  setToggleStatus: Dispatch<SetStateAction<BookToggleStatus>>
}) => {
  const [filterOption, setFilterOption] = useState<FilterOption>('ALL')

  const applyFilterOption = (books: Books) => {
    switch (filterOption) {
      case 'ALL':
        return books
      case 'INCOME':
        return books.filter((e) => e.type === 'INCOME')
      case 'EXPENSE':
        return books.filter((e) => e.type === 'EXPENSE')
    }
  }

  return (
    <YStack
      width="100%"
      height="100%"
      alignItems="flex-start"
      alignSelf="flex-start"
      marginTop={0}
      marginBottom="auto"
    >
      <YStack
        display="flex"
        width="100%"
        flexDirection="column"
        alignItems="flex-start"
        flexShrink={0}
      >
        <YStack
          display="flex"
          height={100}
          paddingVertical={12}
          paddingHorizontal={16}
          flexDirection="column"
          justifyContent="space-between"
          alignItems="flex-start"
          flexShrink={0}
          alignSelf="stretch"
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          backgroundColor="#FFF"
        >
          <CoreBookFilledTop toggleStatus={toggleStatus} setToggleStatus={setToggleStatus} />
          <CoreBookFilledOptions filterOption={filterOption} setFilterOption={setFilterOption} />
        </YStack>
        <CoreBookFilledLists books={applyFilterOption(books)} toggleStatus={toggleStatus} />
      </YStack>
    </YStack>
  )
}

const CoreBookFilledTop = ({
  toggleStatus,
  setToggleStatus,
}: {
  toggleStatus: BookToggleStatus
  setToggleStatus: Dispatch<SetStateAction<BookToggleStatus>>
}) => {
  return (
    <YStack
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      alignSelf="stretch"
    >
      <Text
        color="#3F3F3F"
        fontFamily="$body"
        fontSize={20}
        fontStyle="normal"
        fontWeight="600"
        letterSpacing={0.2}
      >
        ช่องบันทึกการเงิน
      </Text>
      <YStack
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        gap={6}
      >
        <Button
          display="flex"
          flexDirection="row"
          width={74}
          height="100%"
          paddingVertical={6}
          paddingHorizontal={10}
          justifyContent="center"
          alignItems="center"
          borderRadius={24}
          backgroundColor={toggleStatus === 'EDIT' ? '#9A978E' : '#FFF'}
          borderColor="#9A978E"
          borderWidth={1}
          outlineWidth={0}
          gap={6}
          pressStyle={{
            backgroundColor: toggleStatus === 'EDIT' ? '#9A978E' : '#FFF',
            borderColor: '#9A978E',
            borderWidth: 1,
            outlineWidth: 0,
          }}
          hoverStyle={{
            backgroundColor: toggleStatus === 'EDIT' ? '#9A978E' : '#FFF',
            borderColor: '#9A978E',
            borderWidth: 1,
            outlineWidth: 0,
          }}
          onPress={() => setToggleStatus((status) => (status === 'NORMAL' ? 'EDIT' : 'NORMAL'))}
        >
          {toggleStatus === 'EDIT' ? (
            <>
              <SolitoImage
                src={require('../../assets/check.png')}
                width={12}
                height={12}
                contentFit="cover"
                alt="check"
                onLayout={() => {}}
                resizeMode="cover"
              />
              <Text
                color="#FFF"
                fontFamily="$body"
                fontSize={14}
                fontStyle="normal"
                fontWeight="400"
                letterSpacing={0.14}
              >
                ยืนยัน
              </Text>
            </>
          ) : (
            <>
              <SolitoImage
                src={require('../../assets/edit.png')}
                width={12}
                height={12}
                contentFit="cover"
                alt="EDIT"
                onLayout={() => {}}
                resizeMode="cover"
              />
              <Text
                color="#3F3F3F"
                fontFamily="$body"
                fontSize={14}
                fontStyle="normal"
                fontWeight="400"
                letterSpacing={0.14}
              >
                แก้ไข
              </Text>
            </>
          )}
        </Button>
        <Button
          display="flex"
          flexDirection="row"
          width={74}
          height="100%"
          paddingVertical={6}
          paddingHorizontal={10}
          justifyContent="center"
          alignItems="center"
          borderRadius={24}
          borderWidth={1}
          borderColor="#6F6F6F"
          gap={6}
          backgroundColor={toggleStatus === 'DELETE' ? '#9A978E' : '#FFF'}
          pressStyle={{
            backgroundColor: toggleStatus === 'DELETE' ? '#9A978E' : '#FFF',
            borderColor: '#000',
          }}
          hoverStyle={{
            backgroundColor: toggleStatus === 'DELETE' ? '#9A978E' : '#FFF',
            borderColor: '#000',
          }}
          onPress={() => setToggleStatus((status) => (status === 'NORMAL' ? 'DELETE' : 'NORMAL'))}
        >
          {toggleStatus === 'DELETE' ? (
            <>
              <SolitoImage
                src={require('../../assets/check.png')}
                width={12}
                height={12}
                contentFit="cover"
                alt="check"
                onLayout={() => {}}
                resizeMode="cover"
              />
              <Text
                color="#FFF"
                fontFamily="$body"
                fontSize={14}
                fontStyle="normal"
                fontWeight="400"
                letterSpacing={0.14}
              >
                ยืนยัน
              </Text>
            </>
          ) : (
            <>
              <SolitoImage
                src={require('../../assets/delete.png')}
                width={12}
                height={12}
                contentFit="cover"
                alt="DELETE"
                onLayout={() => {}}
                resizeMode="cover"
              />
              <Text
                color="#3F3F3F"
                fontFamily="$body"
                fontSize={14}
                fontStyle="normal"
                fontWeight="400"
                letterSpacing={0.14}
              >
                ลบ
              </Text>
            </>
          )}
        </Button>
      </YStack>
    </YStack>
  )
}

const CoreBookFilledOptions = ({
  filterOption,
  setFilterOption,
}: {
  filterOption: FilterOption
  setFilterOption: Dispatch<SetStateAction<FilterOption>>
}) => {
  return (
    <YStack
      display="flex"
      flexDirection="row"
      height={30}
      alignItems="flex-start"
      gap={10}
      flexShrink={0}
    >
      <Button
        display="flex"
        height="auto"
        paddingVertical={6}
        paddingHorizontal={10}
        justifyContent="flex-end"
        alignItems="center"
        gap={4}
        borderRadius={20}
        borderWidth={0}
        outlineWidth={0}
        backgroundColor={filterOption === 'ALL' ? '#FFD14E' : '#F6F4ED'}
        hoverStyle={{
          backgroundColor: filterOption === 'ALL' ? '#FFD14E' : '#F6F4ED',
          borderWidth: 0,
          outlineWidth: 0,
        }}
        pressStyle={{
          backgroundColor: filterOption === 'ALL' ? '#FFD14E' : '#F6F4ED',
          borderWidth: 0,
          outlineWidth: 0,
        }}
        onPress={() => setFilterOption('ALL')}
      >
        <Text
          color={filterOption === 'ALL' ? '#3F3F3F' : '#6F6F6F'}
          fontFamily="$body"
          fontSize={14}
          fontStyle="normal"
          fontWeight={filterOption === 'ALL' ? '600' : '400'}
          letterSpacing={0.14}
        >
          รวม
        </Text>
      </Button>
      <Button
        display="flex"
        height="auto"
        paddingVertical={6}
        paddingHorizontal={10}
        justifyContent="flex-end"
        alignItems="center"
        gap={4}
        borderRadius={20}
        outlineWidth={0}
        borderWidth={0}
        backgroundColor={filterOption === 'INCOME' ? '#FFD14E' : '#F6F4ED'}
        hoverStyle={{
          backgroundColor: filterOption === 'INCOME' ? '#FFD14E' : '#F6F4ED',
          borderWidth: 0,
          outlineWidth: 0,
        }}
        pressStyle={{
          backgroundColor: filterOption === 'INCOME' ? '#FFD14E' : '#F6F4ED',
          borderWidth: 0,
          outlineWidth: 0,
        }}
        onPress={() => setFilterOption('INCOME')}
      >
        <Text
          color={filterOption === 'INCOME' ? '#3F3F3F' : '#6F6F6F'}
          fontFamily="$body"
          fontSize={14}
          fontStyle="normal"
          fontWeight={filterOption === 'INCOME' ? '600' : '400'}
          letterSpacing={0.14}
        >
          แค่รายรับ
        </Text>
      </Button>
      <Button
        display="flex"
        height="auto"
        paddingVertical={6}
        paddingHorizontal={10}
        justifyContent="flex-end"
        alignItems="center"
        gap={4}
        borderRadius={20}
        outlineWidth={0}
        borderWidth={0}
        backgroundColor={filterOption === 'EXPENSE' ? '#FFD14E' : '#F6F4ED'}
        hoverStyle={{
          backgroundColor: filterOption === 'EXPENSE' ? '#FFD14E' : '#F6F4ED',
          borderWidth: 0,
          outlineWidth: 0,
        }}
        pressStyle={{
          backgroundColor: filterOption === 'EXPENSE' ? '#FFD14E' : '#F6F4ED',
          borderWidth: 0,
          outlineWidth: 0,
        }}
        onPress={() => setFilterOption('EXPENSE')}
      >
        <Text
          color={filterOption === 'EXPENSE' ? '#3F3F3F' : '#6F6F6F'}
          fontFamily="$body"
          fontSize={14}
          fontStyle="normal"
          fontWeight={filterOption === 'EXPENSE' ? '600' : '400'}
          letterSpacing={0.14}
        >
          แค่รายจ่าย
        </Text>
      </Button>
    </YStack>
  )
}

const CoreBookFilledLists = ({
  books,
  toggleStatus,
}: {
  books: Books
  toggleStatus: BookToggleStatus
}) => {
  const [, setLedgerOperation] = useLedgerOperation()
  const [, setIsDialogOpen] = useIsDialogOpen()
  const [, setIsSheetOpen] = useIsSheetOpen()

  const withOpenSheet = createWithOpenSheet(setIsSheetOpen)
  const withDiaglogOpen = createWithDiaglogOpen(setIsDialogOpen)

  const createPartialSelectOnWithAnd =
    (book: Book) => (fn: (callback: () => void) => void) => (action: LedgerAction) => () =>
      fn(() =>
        setLedgerOperation((ledgerOperation) => {
          return {
            ...ledgerOperation,
            id: book.id,
            type: book.type,
            category: book.category,
            action: action,
            amount: book.amount,
            date: book.date,
          }
        })
      )

  const CoreBookFilledList = ({ book }: { book: Book }) => {
    const handleEdit = createPartialSelectOnWithAnd(book)(withOpenSheet)('EDIT')
    const handleDelete = createPartialSelectOnWithAnd(book)(withDiaglogOpen)('DELETE')

    return (
      <YStack
        display="flex"
        flexDirection="row"
        height={46}
        paddingVertical={10}
        paddingHorizontal={16}
        justifyContent="space-between"
        alignItems="center"
        alignSelf="stretch"
        backgroundColor="#FFF"
      >
        <YStack display="flex" flexDirection="row" alignItems="center" gap={10}>
          {toggleStatus === 'NORMAL' ? (
            <YStack />
          ) : (
            <Button
              padding={0}
              backgroundColor="#FFF"
              hoverStyle={{
                backgroundColor: '#FFF',
                borderWidth: 0,
                outlineWidth: 0,
              }}
              pressStyle={{
                backgroundColor: '#FFF',
                borderWidth: 0,
                outlineWidth: 0,
              }}
              borderWidth={0}
              outlineWidth={0}
              onPress={toggleStatus === 'EDIT' ? handleEdit : handleDelete}
            >
              <SolitoImage
                src={
                  toggleStatus === 'EDIT'
                    ? require('../../assets/edit.png')
                    : require('../../assets/delete.png')
                }
                width={17}
                height={17}
                contentFit="cover"
                alt="delete"
                onLayout={() => {}}
                resizeMode="cover"
              />
            </Button>
          )}
          <Text
            color="#3F3F3F"
            fontFamily="$body"
            fontSize={16}
            fontStyle="normal"
            fontWeight="400"
            letterSpacing={0.16}
          >
            {book.category}
          </Text>
        </YStack>
        <Text
          color="#3F3F3F"
          textAlign="right"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="400"
          letterSpacing={0.16}
        >
          {`${book.type === 'INCOME' ? '+' : '-'}${addComma(book.amount)}`}
        </Text>
      </YStack>
    )
  }

  return (
    <YStack display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch">
      {books.map((e, i) => (
        <CoreBookFilledList book={e} key={i} />
      ))}
      <YStack
        display="flex"
        flexDirection="row"
        height={46}
        paddingVertical={10}
        paddingHorizontal={16}
        justifyContent="space-between"
        alignItems="center"
        alignSelf="stretch"
        borderRadius={10}
        backgroundColor="#FFF3D1"
      >
        <Text
          color="#82630E"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="600"
          letterSpacing={0.16}
        >
          ยอดคงเหลือวันนี้ (รายรับ-รายจ่าย)
        </Text>
        <Text
          color="#82630E"
          textAlign="right"
          fontFamily="$body"
          fontSize={16}
          fontStyle="normal"
          fontWeight="600"
          letterSpacing={0.16}
        >
          {addComma(
            books
              .map((e) => Number(`${e.type === 'EXPENSE' ? '-' : ''}${e.amount}`))
              .reduce((a, b) => a + b)
          )}
        </Text>
      </YStack>
    </YStack>
  )
}
