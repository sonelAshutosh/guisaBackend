import { Router } from 'express'
import {
  createNewUser,
  getAllUsers,
  loginUser,
} from '../controllers/userControllers.js'

const userRouter = Router()

userRouter.get('/', getAllUsers)

userRouter.post('/', createNewUser)
userRouter.post('/login', loginUser)

export default userRouter
