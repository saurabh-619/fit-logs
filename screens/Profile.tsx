import { StyleSheet, } from 'react-native'
import React from 'react'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

const ProfileScreen = ({navigation}: RootTabScreenProps<'Profile'>) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})