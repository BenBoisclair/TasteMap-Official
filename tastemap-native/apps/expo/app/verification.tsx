import { VerificationScreen } from 'app/features/verification/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Verification',
          headerShown: false,
        }}
      />
      <VerificationScreen />
    </>
  )
}
