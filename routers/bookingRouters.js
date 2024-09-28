import { Router } from 'express'
import {
  createBooking,
  getbookingsByProvider,
  getBookingsForUser,
} from '../controllers/bookingControllers.js'

const bookingRouter = Router()

bookingRouter.get('/user/:userId', getBookingsForUser)
bookingRouter.get('/provider/:providerId', getbookingsByProvider)

bookingRouter.post('/', createBooking)

export default bookingRouter
