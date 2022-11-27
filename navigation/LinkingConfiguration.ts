/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { RootStackParamList } from '../types'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'one',
            },
          },
          Search: {
            screens: {
              SearchScreen: 'two',
            },
          },
          AddWorkout: {
            screens: {
              AddWorkoutScreen: 'three',
            },
          },
          History: {
            screens: {
              HistoryScreen: 'four',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'five',
            },
          },
        },
      },
      Modal: 'modal',
      WorkoutPRForm: 'workout-pr-form-modal',
      NotFound: '*',
    },
  },
}

export default linking
