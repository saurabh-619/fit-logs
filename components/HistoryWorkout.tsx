import { StyleSheet } from 'react-native'
import React from 'react'
import { IWorkout } from '../types/workout'
import Colors from '../constants/Colors'
import { Text, View } from './Themed'
import dayjs from 'dayjs'
import { Feather, FontAwesome5 } from '@expo/vector-icons'

interface IHistoryWorkoutProps {
  workout: IWorkout
}

const HistoryWorkout: React.FC<IHistoryWorkoutProps> = (props) => {
  const { workout } = props

  return (
    <View style={styles.card}>
      <View style={styles.rowContent}>
        <View style={styles.iconLabel}>
          <Feather name="calendar" style={styles.icon} />
          <Text style={styles.date}>
            {dayjs(workout.created_at).format('MMM DD, YYYY')}
          </Text>
        </View>
        <View style={[styles.iconLabel]}>
          <FontAwesome5 name="dumbbell" style={styles.icon} />
          <Text style={styles.date}>{workout.prsByWorkout.length} prs</Text>
        </View>
      </View>
      <View style={[styles.rowContent, { justifyContent: 'flex-start' }]}>
        <View style={[styles.iconLabel, styles.mr_15]}>
          <Feather name="heart" style={styles.analyticsIcon} />
          <Text style={styles.analytics}>{workout.likesByWorkout.length}</Text>
        </View>
        <View style={styles.iconLabel}>
          <Feather name="message-square" style={styles.analyticsIcon} />
          <Text style={styles.analytics}>
            {workout.commentsByWorkout.length}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default HistoryWorkout

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    width: '100%',
    backgroundColor: Colors.dark.card,
    borderRadius: 14,
    shadowColor: Colors.dark.accent,
    shadowOffset: { height: 1, width: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.card,
  },
  mr_15: {
    marginRight: 15,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
  },
  icon: {
    fontSize: 16,
    color: Colors.dark.text_2,
    marginRight: 8,
  },
  date: {
    fontSize: 16,
    color: Colors.dark.text_2,
    fontFamily: 'inter-medium',
  },
  analyticsIcon: {
    marginRight: 8,
    fontSize: 15,
    color: Colors.dark.gray500,
  },
  analytics: {
    fontSize: 15,
    color: Colors.dark.gray500,
    fontFamily: 'inter-medium',
  },
})
