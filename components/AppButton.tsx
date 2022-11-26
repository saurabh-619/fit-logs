import { StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import { Text } from './Themed'
import Colors from '../constants/Colors'

interface IAppButton {
  px?: number
  py?: number
  text: string
  onPress: () => void
}

const AppButton: React.FC<IAppButton> = (props) => {
  const { px, py, text = 'app button', onPress } = props

  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        styles.buttonContainer,
        { paddingHorizontal: px ?? 20, paddingVertical: py ?? 16 },
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  )
}

export default AppButton

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.dark.accent,
    borderRadius: 13,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'inter-semibold',
  },
})
