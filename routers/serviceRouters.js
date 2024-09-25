import { Router } from 'express'
import {
  createNewService,
  getAllServices,
  getServiceByLocation,
} from '../controllers/serviceControllers.js'

const serviceRouter = Router()

serviceRouter.get('/', getAllServices)
serviceRouter.get('/location/:location', getServiceByLocation)

serviceRouter.post('/', createNewService)

export default serviceRouter
