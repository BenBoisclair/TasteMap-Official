import { BookScreen } from 'app/features/book/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Book',
          headerShown: false,
        }}
      />
      <BookScreen />
    </>
  )
}
