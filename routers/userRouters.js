import { Router } from 'express'
import {
  becomeProvider,
  createNewUser,
  getAllUsers,
  getUserById,
  loginUser,
} from '../controllers/userControllers.js'

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:userId', getUserById)

userRouter.post('/', createNewUser)
userRouter.post('/login', loginUser)

userRouter.post('/becomeProvider', becomeProvider)

export default userRouter
