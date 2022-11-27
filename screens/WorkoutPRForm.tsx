import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import AppButton from '../components/AppButton'
import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import exerciseData from '../constants/exercises.json'
import { RootStackParamList } from '../types'
import uuid from 'react-native-uuid'
import { IPRState } from './AddWorkout'

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutPRForm'>

const WorkoutPRForm = ({ route, navigation }: Props) => {
  const { addNewPR } = route.params

  const [selectedExercise, setSelectedExercise] = useState(
    exerciseData[0].exercise,
  )
  const [weight, setWeight] = useState<string | null>(null)
  const [reps, setReps] = useState<string | null>(null)

  const handleAddPR = () => {
    const newPr = {
      uuid: uuid.v4(),
      title: selectedExercise,
      weight: +(weight ?? 0),
      reps: +(reps ?? 0),
    } as IPRState

    addNewPR(newPr)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.pushDown}>
        <View>
          <Text style={styles.heading}>add new PR</Text>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={exerciseData}
            maxHeight={250}
            labelField="exercise"
            valueField="exercise"
            placeholder={'choose exercise'}
            value={selectedExercise}
            onChange={(item) => {
              setSelectedExercise(item.exercise)
            }}
          />
          <View style={styles.inputWrapper}>
            <View style={styles.wrapper}>
              <TextInput
                style={styles.input}
                onChangeText={(t) => setWeight(t)}
                value={weight!}
                placeholder="10"
                keyboardType="numeric"
                selectionColor={Colors.dark.accent}
              />
              <Text style={styles.metric}>kgs</Text>
            </View>
            <View style={styles.wrapper}>
              <TextInput
                style={styles.input}
                onChangeText={setReps}
                value={reps!}
                placeholder="10"
                keyboardType="numeric"
                selectionColor={Colors.dark.accent}
              />
              <Text style={styles.metric}>reps</Text>
            </View>
          </View>
        </View>
        <AppButton text="add" onPress={handleAddPR} />
      </View>
    </View>
  )
}

export default WorkoutPRForm

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 20,
    backgroundColor: 'transparent',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'inter-semibold',
    paddingBottom: 30,
  },
  pushDown: { height: '95%', justifyContent: 'space-between' },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: Colors.dark.text,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputWrapper: {
    marginTop: 50,
    width: '100%',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    width: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    fontFamily: 'inter-medium',
    color: Colors.dark.text,
  },
  wrapper: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metric: {
    paddingLeft: 0,
    fontSize: 18,
    color: Colors.dark.gray500,
  },
})
