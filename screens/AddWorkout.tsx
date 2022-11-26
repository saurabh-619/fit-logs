import { StyleSheet, } from 'react-native'
import React from 'react'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

const AddWorkoutScreen = ({navigation}: RootTabScreenProps<'AddWorkout'>) => {
  return (
    <View style={styles.container}>
      <Text>Add workout</Text>
    </View>
  )
}

export default AddWorkoutScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})