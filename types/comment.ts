import { IUser } from './user'

export interface IComment {
  id: number
  gym_user: IUser
  created_at: string
  updated_at: string
}
