import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

export default function HomeLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    IBMPlexSansThin: require('../assets/fonts/IBMPlexSansThai-Thin.ttf'),
    IBMPlexSansExtraLight: require('../assets/fonts/IBMPlexSansThai-ExtraLight.ttf'),
    IBMPlexSansLight: require('../assets/fonts/IBMPlexSansThai-Light.ttf'),
    IBMPlexSansRegular: require('../assets/fonts/IBMPlexSansThai-Regular.ttf'),
    IBMPlexSansMedium: require('../assets/fonts/IBMPlexSansThai-Medium.ttf'),
    IBMPlexSansSemiBold: require('../assets/fonts/IBMPlexSansThai-SemiBold.ttf'),
    IBMPlexSansBold: require('../assets/fonts/IBMPlexSansThai-Bold.ttf'),
  })
  const scheme = useColorScheme()

  if (!loaded) {
    return null
  }
  return (
    <Provider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
    </Provider>
  )
}
