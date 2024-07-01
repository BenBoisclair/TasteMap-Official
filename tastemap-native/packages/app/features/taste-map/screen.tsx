import { useQuery } from 'react-query'
import { AccountScreen } from './account/screen'
import { BookScreen } from './book/screen'
import { DashboardScreen } from './dashboard/screen'
import { useInternalScreen } from 'app/atoms/internalScreen'

export const TasteMapScreen = () => {
  const { data } = useQuery('todo', () => fetch('/api/smth'))
  return <BookScreen />
  //const [internalScreen] = useInternalScreen()
  //
  //return (
  //  <>
  //    {internalScreen === 'book' ? (
  //      <BookScreen />
  //    ) : internalScreen === 'account' ? (
  //      <AccountScreen />
  //    ) : internalScreen === 'dashboard' ? (
  //      <DashboardScreen />
  //    ) : (
  //      <></>
  //    )}
  //  </>
  //)
}
