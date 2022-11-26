import { IComment } from './comment'
import { ILike } from './like'
import { IPr } from './pr'

export interface IWorkout {
  id: number
  prsByWorkout: IPr[]
  likesByWorkout: ILike[]
  commentsByWorkout: IComment[]
  created_at: string
  updated_at: string
}
