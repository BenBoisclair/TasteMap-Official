import { Books } from '../../../../apps/next/pages/api/book/interface'
import { getApi } from 'app/utils/fetch'
import { useQuery } from 'react-query'
import { YStack, Text } from '@my/ui'
import { addComma } from './utils'

export const CoreSummary = () => {
  const { data } = useQuery('books', () => getApi('/book/today'))
  const books = data?.data && Books.safeParse(data.data).success ? Books.parse(data.data) : []

  return (
    <YStack flex={1} width="100%" display="flex" flexDirection="column" alignItems="flex-start">
      <YStack
        display="flex"
        width="100%"
        paddingVertical={20}
        paddingHorizontal={30}
        flexDirection="column"
        alignItems="flex-start"
        gap={18}
        alignSelf="stretch"
        backgroundColor="#FFF"
        borderRadius={10}
      >
        <YStack display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch">
          <Text
            color="#3F3F3F"
            fontFamily="$body"
            fontSize={20}
            fontStyle="normal"
            fontWeight="700"
            letterSpacing={0.2}
          >
            คุณมีรายได้
          </Text>
          <Text
            color="#33BFBE"
            fontFamily="$body"
            fontSize={35}
            fontStyle="normal"
            fontWeight="700"
            letterSpacing={0.35}
          >
            {books.length !== 0 &&
              `${addComma(
                books
                  .filter((book) => book.type === 'INCOME')
                  .map((book) => Number(book.amount))
                  .reduce((a, b) => a + b, 0)
              )} บาท`}
          </Text>
        </YStack>
        <YStack display="flex" flexDirection="column" alignItems="flex-start" alignSelf="stretch">
          <Text
            color="#3F3F3F"
            fontFamily="$body"
            fontSize={20}
            fontStyle="normal"
            fontWeight="700"
            letterSpacing={0.2}
          >
            คุณมีรายจ่าย
          </Text>
          <Text
            color="#EB5E2A"
            fontFamily="$body"
            fontSize={35}
            fontStyle="normal"
            fontWeight="700"
            letterSpacing={0.35}
          >
            {books.length !== 0 &&
              `${addComma(
                books
                  .filter((book) => book.type === 'EXPENSE')
                  .map((book) => Number(book.amount))
                  .reduce((a, b) => a + b, 0)
              )} บาท`}
          </Text>
        </YStack>
      </YStack>
      <YStack
        display="flex"
        paddingVertical={16}
        paddingHorizontal={20}
        flexDirection="column"
        alignItems="flex-start"
        gap={10}
        flexGrow={1}
      >
        <YStack
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={2}
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
            คุณได้กำไร
          </Text>
          <Text
            color="#3F3F3F"
            fontFamily="$body"
            fontSize={35}
            fontStyle="normal"
            fontWeight="700"
            letterSpacing={0.35}
          >
            {books.length !== 0 &&
              `${addComma(
                books
                  .map((book) =>
                    book.type === 'EXPENSE' ? Number(-book.amount) : Number(book.amount)
                  )
                  .reduce((a, b) => a + b, 0)
              )} บาท`}
          </Text>
        </YStack>
      </YStack>
    </YStack>
  )
}
