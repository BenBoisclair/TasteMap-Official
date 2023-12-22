import { AccountScreen } from 'app/features/account/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Account',
          headerShown: false,
        }}
      />
      <AccountScreen />
    </>
  )
}
