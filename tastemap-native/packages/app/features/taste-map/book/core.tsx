import { Books } from '../../../../../apps/next/pages/api/book/interface'
import { useQuery, QueryObserverResult } from 'react-query'
import { CoreBookFilled } from './coreBookFilled'
import { CoreBookEmpty } from './coreBookEmpty'
import { BookDialog } from './bookDialog'
import { getApi } from 'app/utils/fetch'
import { BookSheet } from './bookSheet'
import { useEffect, useState } from 'react'
import { usePhoneNumber } from 'app/atoms/phoneNumber'

export type BookToggleStatus = 'EDIT' | 'DELETE' | 'NORMAL'
export type BookRefetch = () => Promise<QueryObserverResult<Books, Error>>

export const CoreBook = () => {
  const [toggleStatus, setToggleStatus] = useState<BookToggleStatus>('NORMAL')
  const { data, refetch } = useQuery('books', () => getApi('/book/today'))
  const [phoneNumber] = usePhoneNumber()

  // for apple dev to test
  if (phoneNumber === '0110') {
    return (
      <>
        <CoreBookEmpty />
        <BookDialog refetch={refetch as BookRefetch} />
        <BookSheet refetch={refetch as BookRefetch} />
      </>
    )
  }

  return (
    <>
      {data && data?.data.length !== 0 ? (
        <CoreBookFilled
          books={Books.parse(data?.data)}
          toggleStatus={toggleStatus}
          setToggleStatus={setToggleStatus}
        />
      ) : (
        <CoreBookEmpty />
      )}
      <BookDialog refetch={refetch as BookRefetch} />
      <BookSheet refetch={refetch as BookRefetch} />
    </>
  )
}
