import { IUser } from './user'

export interface ILike {
  id: number
  gym_user: IUser
  created_at: string
  updated_at: string
}
