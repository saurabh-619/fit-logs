import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppButton from '../components/AppButton'
import { Text, View } from '../components/Themed'
import { useAuth } from '../context/auth'
import { RootTabScreenProps } from '../types'

const ProfileScreen = ({ navigation }: RootTabScreenProps<'Profile'>) => {
  const { authState } = useAuth()
  const { logout } = useAuth()

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.userAvatar}
            source={{ uri: authState?.user.avatar }}
          />
          <Text style={styles.name}>{authState?.user.name}</Text>
        </View>
        <AppButton text="logout" onPress={logout} />
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  userInfo: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 200,
  },
  userAvatar: {
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  name: {
    fontFamily: 'inter-medium',
    fontSize: 14,
    marginVertical: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
})
