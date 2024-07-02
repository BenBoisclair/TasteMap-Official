import { AccountScreen } from './account/screen'
import { BookScreen } from './book/screen'
import { DashboardScreen } from './dashboard/screen'
import { useInternalScreen } from 'app/atoms/internalScreen'

export const TasteMapScreen = () => {
  const [internalScreen] = useInternalScreen()

  return (
    <>
      {internalScreen === 'book' ? (
        <BookScreen />
      ) : internalScreen === 'account' ? (
        <AccountScreen />
      ) : internalScreen === 'dashboard' ? (
        <DashboardScreen />
      ) : (
        <></>
      )}
    </>
  )
}
