import { useMutation } from '@apollo/client'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { Text, View } from '../components/Themed'
import Workouts from '../components/Workouts'
import Colors from '../constants/Colors'
import { CREATE_PR, CREATE_WORKOUT } from '../constants/queries'
import { useAuth } from '../context/auth'
import { RootTabScreenProps } from '../types'

export interface IPRState {
  uuid: string
  title: string
  weight: number
  reps: number
}

const AddWorkoutScreen = ({ navigation }: RootTabScreenProps<'AddWorkout'>) => {
  const { authState } = useAuth()
  const [createWorkout] = useMutation(CREATE_WORKOUT)
  const [createPR] = useMutation(CREATE_PR)

  const [prs, setPrs] = useState<IPRState[]>([])

  const addNewPR = (pr: IPRState) => {
    setPrs((p) => [...p, pr])
  }

  const removeAPR = (uuid: string) => {
    setPrs((p) => p.filter((x) => x.uuid !== uuid))
  }

  const handleAddPR = () => {
    navigation.navigate('WorkoutPRForm', { addNewPR: addNewPR })
  }

  const handleCreateWorkout = async () => {
    try {
      const { data: createWorkoutData } = await createWorkout({
        variables: {
          photos: '',
          user: authState?.user.id,
        },
      })

      const workoutId = createWorkoutData.insert_workout.returning[0].id

      await Promise.all(
        prs.map((pr) =>
          createPR({
            variables: {
              reps: pr.reps,
              title: pr.title,
              user: authState?.user.id,
              weight: pr.weight,
              workout: workoutId,
            },
          }),
        ),
      )

      Toast.show({
        type: 'success',
        text1: 'success',
        text2: "today's workout added",
        topOffset: 70,
      })
      setPrs([])
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContent}>
        <Text style={styles.title}>add workout</Text>
        <View style={styles.actionsRow}>
          <TouchableHighlight onPress={handleAddPR}>
            <FontAwesome5 name="plus" size={16} style={styles.icon} />
          </TouchableHighlight>
          {prs.length > 0 && (
            <TouchableHighlight onPress={handleCreateWorkout}>
              <FontAwesome5 name="check" size={16} style={styles.iconGreen} />
            </TouchableHighlight>
          )}
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    alignItems: 'stretch',
    fontFamily: 'inter-semibold',
  },
  icon: {
    height: 30,
    width: 30,
    color: Colors.dark.accent,
  },
  iconGreen: {
    height: 30,
    width: 30,
    color: Colors.dark.success,
  },
  listWrapper: {
    width: '100%',
    padding: 20,
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
})
