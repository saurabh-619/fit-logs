import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@apollo/client'
import { GET_ALL_WORKOUTS_OF_AUTH_USER } from '../constants/queries'
import { useAuth } from '../context/auth'
import Colors from '../constants/Colors'
import HistoryWorkout from '../components/HistoryWorkout'
import { IWorkout } from '../types/workout'

const HistoryScreen = ({ navigation }: RootTabScreenProps<'History'>) => {
  const { authState } = useAuth()

  const { data: history, loading } = useQuery(GET_ALL_WORKOUTS_OF_AUTH_USER, {
    variables: { userId: authState?.user.id },
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContent}>
        <Text style={styles.title}>history</Text>
      </View>
      <ScrollView
        style={styles.listWrapper}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.spinnerView}>
            <ActivityIndicator size="small" color={Colors.dark.accent} />
          </View>
        ) : history?.workout.length !== 0 ? (
          history?.workout.map((workout: IWorkout) => (
            <TouchableOpacity
              key={workout.id}
              onPress={() => {
                navigation.navigate('WorkoutDetail', { id: workout.id })
              }}
            >
              <HistoryWorkout key={workout.id} workout={workout} />
            </TouchableOpacity>
          ))
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

export default HistoryScreen

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
  listWrapper: {
    width: '100%',
    padding: 20,
  },
  spinnerView: {
    justifyContent: 'center',
    height: 500,
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
