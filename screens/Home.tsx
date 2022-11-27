import { useQuery } from '@apollo/client'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FeedWorkout from '../components/FeedWorkout'

import { Text, View } from '../components/Themed'
import Colors from '../constants/Colors'
import { GET_ALL_WORKOUTS } from '../constants/queries'
import { RootTabScreenProps } from '../types'
import { IWorkout } from '../types/workout'

const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  const { data, loading } = useQuery(GET_ALL_WORKOUTS)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowContent}>
        <Text style={styles.title}>feed</Text>
      </View>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.spinnerView}>
            <ActivityIndicator size="small" color={Colors.dark.accent} />
          </View>
        ) : data?.workout.length !== 0 ? (
          data?.workout.map((workout: IWorkout) => (
            <TouchableOpacity
              key={workout.id}
              onPress={() => {
                navigation.navigate('WorkoutDetail', { id: workout.id })
              }}
            >
              <FeedWorkout workout={workout} />
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

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapper: { width: '100%', padding: 20 },
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
