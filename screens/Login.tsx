import { useLazyQuery, useMutation } from '@apollo/client'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'
import AppButton from '../components/AppButton'
import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import { CREATE_USER, GET_A_USER_WITH_EMAIL } from '../constants/queries'
import { useAuth } from '../context/auth'
import { RootTabScreenProps } from '../types'

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = ({ navigation }: RootTabScreenProps<'Login'>) => {
  const [getAUserWithEmail] = useLazyQuery(GET_A_USER_WITH_EMAIL)
  const [createUser] = useMutation(CREATE_USER)

  const { login } = useAuth()
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

  const handleLoginButtonPress = accessToken
    ? getUserData
    : () => promptAsync({ showInRecents: true })

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.ph_20, styles.wrapper]}>
        <View>
          <View style={styles.rowContent}>
            <Text style={styles.title}>login</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.slogan}>
              make gym friends, record & analyze daily progress and share the
              journey
            </Text>
          </View>
          <View style={styles.center}>
            <Image
              source={require('../assets/images/login-anim.gif')}
              style={styles.gif}
              resizeMode="contain"
            />
          </View>
        </View>
        <AppButton text="let's start" onPress={handleLoginButtonPress} />
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapper: {
    height: '90%',
    justifyContent: 'space-between',
  },
  ph_20: { width: '100%', paddingHorizontal: 20 },
  rowContent: {
    paddingTop: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    alignItems: 'stretch',
    fontFamily: 'inter-semibold',
  },
  content: {},
  slogan: {
    marginTop: 40,
    fontSize: 20,
    marginRight: 20,
    alignItems: 'stretch',
    color: Colors.dark.gray500,
    fontFamily: 'inter-medium',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gif: {
    height: 350,
    width: 350,
  },
})
