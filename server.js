import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import userRouter from './routers/userRouters.js'
import serviceRouter from './routers/serviceRouters.js'
import bookingRouter from './routers/bookingRouters.js'

const app = express()
dotenv.config()

const PORT = 5500

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o6pcy.mongodb.net/`

app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ----------------------------------------------------------------
// Database Connection
// ----------------------------------------------------------------
app.use('/users', userRouter)
app.use('/services', serviceRouter)
app.use('/bookings', bookingRouter)

// ----------------------------------------------------------------
// Database Connection
// ----------------------------------------------------------------
mongoose.connect(URI).then(() => {
  app.listen(PORT, () => {
    console.log('Connected to Database')
    console.log(`App listening on PORT ${PORT}`)
  })
})
// ----------------------------------------------------------------
