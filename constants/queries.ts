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
