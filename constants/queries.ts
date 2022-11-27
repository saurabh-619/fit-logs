import { gql } from '@apollo/client'

export const GET_A_USER_WITH_ID = gql`
  query GetAUser($id: bigint!) {
    gym_user_by_pk(id: $id) {
      id
      name
      email
      avatar
      workouts {
        id
        prsByWorkout {
          id
        }
        likesByWorkout {
          gym_user {
            avatar
          }
        }
        commentsByWorkout {
          gym_user {
            avatar
          }
        }
      }
      created_at
      updated_at
    }
  }
`

export const GET_A_USER_WITH_EMAIL = gql`
  query GymUserWithEmail($email: String!) {
    gym_user(limit: 1, where: { email: { _eq: $email } }) {
      id
      name
      avatar
      email
      workouts {
        prsByWorkout {
          id
          title
          weight
          reps
        }
        likesByWorkout {
          id
          gym_user {
            id
            name
          }
        }
        commentsByWorkout {
          id
          gym_user {
            id
            name
          }
        }
      }
      updated_at
      created_at
    }
  }
`

export const GET_ALL_USERS = gql`
  query MyQuery {
    gym_user {
      avatar
      created_at
      email
    }
  }
`

export const CREATE_USER = gql`
  mutation insert_gym_user($avatar: String, $email: String, $name: String) {
    insert_gym_user(objects: { avatar: $avatar, email: $email, name: $name }) {
      returning {
        id
        name
        avatar
        email
        workouts {
          prsByWorkout {
            id
            title
            weight
            reps
          }
          likesByWorkout {
            id
            gym_user {
              id
              name
            }
          }
          commentsByWorkout {
            id
            gym_user {
              id
              name
            }
          }
        }
        updated_at
        created_at
      }
    }
  }
`

export const CREATE_WORKOUT = gql`
  mutation CreateWorkout($photos: String!, $user: bigint!) {
    insert_workout(objects: { photos: $photos, user: $user }) {
      returning {
        id
      }
    }
  }
`

export const CREATE_PR = gql`
  mutation CreatePR(
    $reps: Int!
    $title: String!
    $user: bigint!
    $weight: Int!
    $workout: bigint!
  ) {
    insert_pr(
      objects: {
        reps: $reps
        title: $title
        user: $user
        weight: $weight
        workout: $workout
      }
    ) {
      returning {
        id
      }
    }
  }
`

export const GET_ALL_WORKOUTS_OF_AUTH_USER = gql`
  query GetAllWorkoutsOfAuthUser($userId: bigint!) {
    workout(order_by: { created_at: desc }, where: { user: { _eq: $userId } }) {
      id
      commentsByWorkout {
        id
      }
      likesByWorkout {
        id
      }
      prsByWorkout {
        id
      }
      created_at
      updated_at
    }
  }
`

export const GET_ALL_WORKOUTS = gql`
  query GetAllWorkouts {
    workout(order_by: { created_at: desc }) {
      id
      photos
      gym_user {
        avatar
        id
        name
        email
      }
      likesByWorkout {
        id
      }
      prsByWorkout {
        id
      }
      commentsByWorkout {
        id
      }
      created_at
      updated_at
    }
  }
`

export const GET_A_WORKOUT = gql`
  query GetAWorkout($id: bigint!) {
    workout_by_pk(id: $id) {
      id
      commentsByWorkout {
        created_at
        id
        gym_user {
          avatar
          email
          id
          name
        }
        text
      }
      gym_user {
        avatar
        created_at
        email
        id
        name
        updated_at
      }
      likesByWorkout {
        created_at
        id
        gym_user {
          avatar
          email
          id
          name
        }
        updated_at
      }
      photos
      prsByWorkout {
        created_at
        id
        reps
        title
        weight
        updated_at
      }
      created_at
      updated_at
    }
  }
`
