import { ActivityIndicator, Image, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Text, View } from '../components/Themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { useQuery } from '@apollo/client'
import { GET_A_WORKOUT } from '../constants/queries'
import dayjs from 'dayjs'
import Colors from '../constants/Colors'
import { IPr } from '../types/pr'
import { Feather } from '@expo/vector-icons'

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutDetail'>

const WorkoutDetail: React.FC<Props> = ({ route }) => {
  const { id } = route.params
  const { data, loading } = useQuery(GET_A_WORKOUT, {
    variables: { id },
  })

  function User() {
    return (
      <View style={styles.mt_30}>
        <Text style={styles.sectionHeading}>user info</Text>
        <View style={styles.header}>
          <Image
            source={{ uri: data.workout_by_pk.gym_user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{data.workout_by_pk.gym_user.name}</Text>
            <Text style={styles.subtitle}>
              {data.workout_by_pk.gym_user.email}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  function PRDetails({ pr, index }: { pr: IPr; index: number }) {
    return (
      <View style={styles.repRow}>
        <Text style={styles.repTitle}>
          {index}. {pr.title}
        </Text>
        <View style={styles.repContent}>
          <View style={styles.repsWrapper}>
            <Text style={styles.metric}>{pr.weight}</Text>
            <Text style={styles.metric}>kgs</Text>
          </View>
          <View style={styles.repsWrapper}>
            <Text style={styles.metric}>{pr.reps}</Text>
            <Text style={styles.metric}>reps</Text>
          </View>
        </View>
      </View>
    )
  }

  function PRData() {
    return (
      <View style={styles.mt_20}>
        <Text style={styles.sectionHeading}>prs</Text>
        {data.workout_by_pk.prsByWorkout.map((pr: IPr, index: number) => (
          <PRDetails key={pr.id} pr={pr} index={index + 1} />
        ))}
      </View>
    )
  }

  function Footer() {
    return (
      <View style={[styles.footer, styles.mt_20]}>
        <View style={[styles.repRow, { justifyContent: 'flex-start' }]}>
          <View style={[styles.iconLabel, styles.mr_15]}>
            <Feather name="heart" style={styles.analyticsIcon} />
            <Text style={styles.analytics}>
              {data?.workout_by_pk.likesByWorkout.length}
            </Text>
          </View>
          <View style={styles.iconLabel}>
            <Feather name="message-square" style={styles.analyticsIcon} />
            <Text style={styles.analytics}>
              {data?.workout_by_pk.commentsByWorkout.length}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        <Text style={styles.title}>workout details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
        {loading ? (
          <View style={styles.spinnerView}>
            <ActivityIndicator size="small" color={Colors.dark.accent} />
          </View>
        ) : (
          <View>
            <Text style={styles.date}>
              {dayjs(data.workout_by_pk.created_at).format('DD/MM/YYYY - dddd')}
            </Text>
            {data?.workout_by_pk?.photos.length !== 0 && (
              <View style={styles.photo}>
                <Image
                  source={{ uri: data.workout_by_pk.photos }}
                  resizeMode="cover"
                  style={styles.workoutPhoto}
                />
              </View>
            )}
            <User />
            <PRData />
            <Footer />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default WorkoutDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  rowContent: {
    paddingTop: 30,
    width: '100%',
    textAlign: 'left',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    alignItems: 'stretch',
    fontFamily: 'inter-semibold',
  },
  date: {
    fontSize: 18,
    alignItems: 'stretch',
    color: Colors.dark.accent,
    fontFamily: 'inter-bold',
  },
  wrapper: { width: '100%', paddingTop: 10 },
  spinnerView: {
    justifyContent: 'center',
    height: 500,
  },
  sectionHeading: {
    marginVertical: 20,
    fontSize: 15,
    fontFamily: 'inter-medium',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: { height: 42, width: 42, borderRadius: 35 },
  userInfo: { marginLeft: 10 },
  name: { fontFamily: 'inter-medium', color: Colors.dark.gray300 },
  subtitle: {
    fontFamily: 'inter-regular',
    fontSize: 10.5,
    marginTop: 2,
    color: Colors.dark.gray500,
  },
  mt_30: {
    marginTop: 30,
  },
  mt_20: {
    marginTop: 20,
  },
  photo: {
    paddingTop: 40,
    alignItems: 'center',
  },
  workoutPhoto: {
    height: 300,
    width: '85%',
    borderRadius: 12,
  },
  repRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  repContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  repsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  repTitle: {
    paddingLeft: 0,
    fontSize: 16,
    fontFamily: 'inter-medium',
    color: Colors.dark.text_3,
  },
  metric: {
    paddingLeft: 0,
    fontSize: 14,
    color: Colors.dark.gray500,
    marginHorizontal: 3,
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
  mr_15: {
    marginRight: 15,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})
