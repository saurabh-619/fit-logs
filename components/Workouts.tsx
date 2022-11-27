import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { IPRState } from '../screens/AddWorkout'
import Colors from '../constants/Colors'
import { Feather } from '@expo/vector-icons'

interface IWorkouts {
  prs: IPRState[]
  removeAPR: (uuid: string) => void
}

const Workouts: React.FC<IWorkouts> = (props) => {
  const { prs, removeAPR } = props

  return (
    <View style={styles.container}>
      {prs.map((pr, idx) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>
              {idx + 1}. {pr.title}
            </Text>
            <TouchableHighlight onPress={() => removeAPR(pr.uuid)}>
              <Feather size={14} style={styles.icon} name="x-circle" />
            </TouchableHighlight>
          </View>
          <View style={styles.info}>
            <View style={styles.infoWrapper}>
              <Text style={styles.paramText}>{pr.weight}</Text>
              <Text style={styles.metric}>kgs</Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.paramText}>{pr.weight}</Text>
              <Text style={styles.metric}>kgs</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Workouts

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  row: {
    paddingTop: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    minHeight: 110,
    backgroundColor: Colors.dark.card,
    padding: 16,
    marginVertical: 10,
    borderRadius: 14,
  },
  title: {
    fontSize: 15,
    color: Colors.dark.gray300,
    fontFamily: 'inter-medium',
  },
  icon: {
    color: Colors.dark.gray400,
  },
  paramText: {
    fontSize: 18,
    color: Colors.dark.text,
    fontFamily: 'inter-semibold',
    marginRight: 5,
  },
  metric: {
    paddingLeft: 0,
    fontSize: 14,
    color: Colors.dark.gray500,
    fontFamily: 'inter-regular',
  },
  info: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-around',
    paddingLeft: 5,
    marginRight: 30,
  },
})
