import Service from '../models/Service.js'

export const getAllServices = async (req, res) => {
  let services
  try {
    services = await Service.find()
  } catch (err) {
    console.log(err)
  }
  if (!services) {
    return res.status(500).json({ message: 'Unexpected Error Occurred' })
  }
  return res.status(200).json({ services })
}

export const getServiceByLocation = async (req, res, next) => {}

export const createNewService = async (req, res, next) => {
  const { name, description, type, price, location, providerId } = req.body

  // Validate request body
  if (!name || !description || !type || !price || !location) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    // Create a new service document
    const newService = new Service({
      name,
      description,
      type,
      price,
      location,
      providerId,
    })

    // Save the service to the database
    await newService.save()

    // Respond with the created service
    return res.status(201).json({
      message: 'Service created successfully',
      service: newService,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Error creating service' })
  }
}
