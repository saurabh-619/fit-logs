import { IUser } from './user'
import { IComment } from './comment'
import { ILike } from './like'
import { IPr } from './pr'

export interface IWorkout {
  id: number
  photos: string
  gym_user: IUser
  prsByWorkout: IPr[]
  likesByWorkout: ILike[]
  commentsByWorkout: IComment[]
  created_at: string
  updated_at: string
}
