import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { IWorkout } from '../types/workout'
import Colors from '../constants/Colors'
import { Text, View } from './Themed'
import dayjs from 'dayjs'
import { Feather, FontAwesome5 } from '@expo/vector-icons'

interface IFeedWorkoutProps {
  workout: IWorkout
}

const FeedWorkout: React.FC<IFeedWorkoutProps> = (props) => {
  const { workout } = props

  return (
    <View style={styles.card}>
      <View style={styles.rowContent}>
        <View style={styles.header}>
          <Image
            source={{ uri: workout.gym_user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{workout.gym_user.name}</Text>
            <Text style={styles.subtitle}>{workout.gym_user.email}</Text>
          </View>
        </View>
        <View style={[styles.prs]}>
          <FontAwesome5 name="dumbbell" style={styles.icon} />
          <Text style={styles.date}>{workout.prsByWorkout.length} prs</Text>
        </View>
      </View>
      {workout.photos.length !== 0 && (
        <View style={styles.photo}>
          <Image
            source={{ uri: workout.photos }}
            resizeMode="cover"
            style={styles.workoutPhoto}
          />
        </View>
      )}
      <View style={styles.footer}>
        <View style={[styles.rowContent, { justifyContent: 'flex-start' }]}>
          <View style={[styles.iconLabel, styles.mr_15]}>
            <Feather name="heart" style={styles.analyticsIcon} />
            <Text style={styles.analytics}>
              {workout.likesByWorkout.length}
            </Text>
          </View>
          <View style={styles.iconLabel}>
            <Feather name="message-square" style={styles.analyticsIcon} />
            <Text style={styles.analytics}>
              {workout.commentsByWorkout.length}
            </Text>
          </View>
        </View>
        <View style={styles.dateContent}>
          <View style={styles.iconLabel}>
            <Feather name="calendar" style={styles.icon} />
            <Text style={styles.date}>
              {dayjs(workout.created_at).format('MMM DD, YYYY')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default FeedWorkout

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 125,
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
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatar: { height: 42, width: 42, borderRadius: 35 },
  userInfo: { backgroundColor: 'transparent', marginLeft: 10 },
  name: { fontFamily: 'inter-medium' },
  subtitle: {
    fontFamily: 'inter-regular',
    fontSize: 10.5,
    marginTop: 2,
    color: Colors.dark.gray500,
  },
  mr_15: {
    marginRight: 15,
  },
  photo: {
    backgroundColor: 'transparent',
    paddingVertical: 40,
    alignItems: 'center',
  },
  workoutPhoto: {
    height: 300,
    width: '100%',
    borderRadius: 8,
  },
  prs: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'transparent',
  },
  icon: {
    fontSize: 12,
    color: Colors.dark.text_2,
    marginBottom: 2,
  },
  dateContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  date: {
    fontSize: 14,
    color: Colors.dark.text_2,
    fontFamily: 'inter-medium',
    marginLeft: 4,
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
