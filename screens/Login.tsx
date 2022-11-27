import { useLazyQuery, useMutation } from '@apollo/client'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { Text, View } from '../components/Themed'
import { CREATE_USER, GET_A_USER_WITH_EMAIL } from '../constants/queries'
import { useAuth } from '../context/auth'
import { RootTabScreenProps } from '../types'

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = ({ navigation }: RootTabScreenProps<'Login'>) => {
  const [getAUserWithEmail] = useLazyQuery(GET_A_USER_WITH_EMAIL)
  const [createUser] = useMutation(CREATE_USER)

  const { authState, login } = useAuth()
  const [accessToken, setAccessToken] = React.useState<string | null>(null)

  const [_, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  })

  async function getOrCreateUser(user: any) {
    const { data: getAUserData } = await getAUserWithEmail({
      variables: {
        email: user.email,
      },
    })

    if (getAUserData.gym_user.length !== 0) {
      console.log('logging in user as already exists.')
      return getAUserData.gym_user[0]
    } else {
      console.log('creating new user on db.')
      const { data: createUserData } = await createUser({
        variables: {
          avatar: user.picture,
          email: user.email,
          name: user.name,
        },
      })

      return createUserData.insert_gym_user.returning[0]
    }
  }

  async function getUserData() {
    let userData = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const user = await userData.json()

    const savedUser = await getOrCreateUser(user)

    login({ token: user.email, user: savedUser })
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication?.accessToken!)
    }

    if (accessToken) {
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
