import { BookState, FinancialMenuBar, NavHorizontalBar } from 'app/components/menu'
import { BookOperationBar } from './bookOperationBar'
import { useLedgerOperation } from './utils'
import { Bottom } from 'app/components/core'
import { useState } from 'react'
import { CoreSummary } from './coreSummary'
import { CoreBook } from './core'
import { YStack } from '@my/ui'
import { Keyboard } from 'react-native'

export function BookScreen() {
  const [coreState, setCoreState] = useState(BookState.BOOK)

  return (
    <YStack f={1} backgroundColor="#FFF" onPress={() => Keyboard.dismiss()}>
      <FinancialMenuBar bookState={coreState} setBookState={setCoreState} />
      <YStack
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#F6F4ED"
        padding={10}
      >
        {coreState === BookState.BOOK ? <CoreBook /> : <CoreSummary />}
      </YStack>
      <Bottom>
        <YStack width="100%" backgroundColor="#F6F4ED">
          {coreState === BookState.BOOK ? <BookOperationBar /> : <></>}
          <NavHorizontalBar />
        </YStack>
      </Bottom>
    </YStack>
  )
}
