import { FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'inter-thin': require('../assets/fonts/Inter-Thin.ttf'),
          'inter-light': require('../assets/fonts/Inter-Light.ttf'),
          'inter-medium': require('../assets/fonts/Inter-Medium.ttf'),
          'inter-regular': require('../assets/fonts/Inter-Regular.ttf'),
          'inter-semibold': require('../assets/fonts/Inter-SemiBold.ttf'),
          'inter-bold': require('../assets/fonts/Inter-Bold.ttf'),
          'inter-black': require('../assets/fonts/Inter-Black.ttf'),
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
