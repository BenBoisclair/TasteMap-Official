import { TasteMapScreen } from 'app/features/taste-map/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'TasteMap',
          headerShown: false,
        }}
      />
      <TasteMapScreen />
    </>
  )
}
