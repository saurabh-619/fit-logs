import { StyleSheet, } from 'react-native'
import React from 'react'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

const SearchScreen = ({navigation}: RootTabScreenProps<'Search'>) => {
  return (
    <View style={styles.container}> 
      <Text>Search</Text>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})