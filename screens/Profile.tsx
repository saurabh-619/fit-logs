import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from '../components/Themed'
import { useAuth } from '../context/auth'
import { RootTabScreenProps } from '../types'

const ProfileScreen = ({navigation}: RootTabScreenProps<'Profile'>) => {
  const {logout} = useAuth()
  
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <Text>Profile</Text>
        <TouchableOpacity onPress={logout}>
          <Text>logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  flex: {
    flex:1,
  },
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})