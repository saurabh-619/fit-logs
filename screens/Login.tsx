import { StyleSheet, } from 'react-native'
import React from 'react'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

const LoginScreen = ({navigation}: RootTabScreenProps<'Login'>) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})