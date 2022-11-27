import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

interface IAppTextInput {
  placeholder: string
  onChangeText: (text: string) => void
}

const AppTextInput: React.FC<IAppTextInput> = (props) => {
  const { placeholder, onChangeText } = props

  return <TextInput placeholder={placeholder} onChangeText={onChangeText} />
}

export default AppTextInput

const styles = StyleSheet.create({})
