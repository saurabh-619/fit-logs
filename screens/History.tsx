import { StyleSheet, } from 'react-native'
import React from 'react'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

const HistoryScreen = ({navigation}: RootTabScreenProps<'History'>) => {
  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})