import { StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useAuth } from '../context/auth'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = ({ navigation }: RootTabScreenProps<'Login'>) => {
  const { authState, login } = useAuth()
  const [ accessToken, setAccessToken ]= React.useState<string|null>(null)

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '922348608234-q0g5qvjipokhahp3df6gphq8os602imi.apps.googleusercontent.com',
    expoClientId:
      '922348608234-hnfel36jood2j3f8niciqr68mf9oam5p.apps.googleusercontent.com',
  })

  async function getUserData() {
    let userData = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const user = await userData.json()
    login({token: user.email})
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication?.accessToken!)
    }

    if(accessToken) {
      getUserData()
    }
  }, [response, accessToken])

  return (
    <View style={styles.container}>
      <Text>Login {authState?.token} </Text>
      <TouchableHighlight
        onPress={
          accessToken ? getUserData : () => promptAsync({ showInRecents: true })
        }
      >
        <Text>login</Text>
      </TouchableHighlight>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
