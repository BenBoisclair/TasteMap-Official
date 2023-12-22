import { BookScreen } from 'app/features/book/screen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Book</title>
      </Head>
      <BookScreen />
    </>
  )
}
