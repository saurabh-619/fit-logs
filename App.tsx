import { NhostReactProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './context/auth'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import { nHostClient } from './lib/nhost'
import Navigation from './navigation'

import { LogBox } from 'react-native'
LogBox.ignoreAllLogs()

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <NhostReactProvider nhost={nHostClient}>
        <NhostApolloProvider nhost={nHostClient}>
          <AuthProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </AuthProvider>
        </NhostApolloProvider>
      </NhostReactProvider>
    )
  }
}
