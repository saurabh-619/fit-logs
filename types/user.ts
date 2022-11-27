import { IWorkout } from './workout'

export interface IUser {
  id: number
  name: string
  email: string
  avatar: string
  workouts: IWorkout[]
  created_at: string
  updated_at: string
}
