import Booking from '../models/Booking.js'
import Service from '../models/Service.js'
import User from '../models/User.js'

export const getBookingsForUser = async (req, res) => {
  const { userId } = req.params

  try {
    const bookings = await Booking.find({ user: userId })

    return res.status(200).json({ bookings })
  } catch (err) {
    console.error(err)

    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export const createBooking = async (req, res) => {
  const { user, service, bookingTime } = req.body

  try {
    // Validate input
    if (!user || !service || !bookingTime) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    // Check if user and service exist
    const foundUser = await User.findById(user)
    const foundService = await Service.findById(service)

    if (!foundUser || !foundService) {
      return res.status(404).json({ message: 'User or Service not found.' })
    }

    // Create a new booking
    const newBooking = new Booking({
      user,
      service,
      bookingTime,
    })

    // Save the booking to the database
    await newBooking.save()

    // Respond with the created booking
    res
      .status(201)
      .json({ message: 'Booking created successfully.', booking: newBooking })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

export const getbookingsByProvider = async (req, res) => {
  const { providerId } = req.params

  try {
    const services = await Service.find({ providerId: providerId })

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: 'No services found for this provider.' })
    }

    const serviceIds = services.map((service) => service._id)
    const bookings = await Booking.find({
      service: { $in: serviceIds },
    }).populate('service')
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for the provider's services." })
    }

    return res.status(200).json({ bookings })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to fetch bookings.' })
  }
}

export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params
  const { status } = req.body

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    )

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    return res.json(updatedBooking)
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update booking status' })
  }
}

export const updatePaymentStatus = async (req, res) => {
  const { bookingId } = req.params

  try {
    const booking = await Booking.findById(bookingId)
    if (!booking) {
      return res.status(404).send('Booking not found')
    }

    booking.paymentStatus = 'paid'
    await booking.save()

    return res.status(200).json({ message: 'Payment successful' })
  } catch (err) {
    return res.status(500).json({ message: 'Failed to process payment' })
  }
}
