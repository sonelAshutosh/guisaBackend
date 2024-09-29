import { Router } from 'express'
import {
  createBooking,
  getbookingsByProvider,
  getBookingsForUser,
  updateBookingStatus,
  updatePaymentStatus,
} from '../controllers/bookingControllers.js'

const bookingRouter = Router()

bookingRouter.get('/user/:userId', getBookingsForUser)
bookingRouter.get('/provider/:providerId', getbookingsByProvider)

bookingRouter.post('/:bookingId/status', updateBookingStatus)
bookingRouter.post('/:bookingId/payment', updatePaymentStatus)

bookingRouter.post('/', createBooking)

export default bookingRouter
