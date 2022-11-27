import { FontAwesome5 } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import { Text, View } from '../components/Themed'
import Workouts from '../components/Workouts'
import Colors from '../constants/Colors'
import { RootTabScreenProps } from '../types'

export interface IPRState {
  uuid: string
  title: string
  weight: number
  reps: number
}

const AddWorkoutScreen = ({ navigation }: RootTabScreenProps<'AddWorkout'>) => {
  const [prs, setPrs] = useState<IPRState[]>([])

  console.log({ prs })

  const addNewPR = (pr: IPRState) => {
    setPrs((p) => [...p, pr])
  }

  const removeAPR = (uuid: string) => {
    setPrs((p) => p.filter((x) => x.uuid !== uuid))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContent}>
        <Text style={styles.title}>Add workout</Text>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('WorkoutPRForm', { addNewPR: addNewPR })
          }}
        >
          <FontAwesome5 name="plus" size={18} style={styles.icon} />
        </TouchableHighlight>
      </View>
      <ScrollView
        style={styles.listWrapper}
        showsVerticalScrollIndicator={false}
      >
        {prs.length ? (
          <Workouts prs={prs} removeAPR={removeAPR} />
        ) : (
          <View style={styles.emptyPrsWrapper}>
            <Text style={styles.emptyPrsText}>
              seems awfully empty in here.
            </Text>
            <Text style={styles.emptyPrsText}>add today's prs.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddWorkoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowContent: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    width: '100%',
    alignItems: 'stretch',
    fontFamily: 'inter-semibold',
  },
  icon: {
    height: 30,
    width: 30,
    color: Colors.dark.accent,
  },
  listWrapper: {
    width: '100%',
  },
  emptyPrsWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  emptyPrsText: {
    color: Colors.dark.gray500,
    fontSize: 13,
    marginVertical: 2,
  },
  listItem: {},
})
