import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res) => {
  let users
  try {
    users = await User.find()
  } catch (e) {
    return console.log(e)
  }

  if (!users) {
    return res.status(500).json({ message: 'Unexpected Error Occurred' })
  }

  return res.status(200).json({ users })
}

export const createNewUser = async (req, res, next) => {
  const { name, email, password, phoneNumber, address } = req.body
  // || (!password && password.length < 6)
  if (!name.trim() || !email.trim()) {
    return res.status(422).json({ message: 'Invalid Data' })
  }

  let user
  const hashedPassword = bcrypt.hashSync(password)

  try {
    user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    })
    await user.save()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Unexpected Error' })
  }

  return res.status(201).json({ message: 'SignUp Successful' })
}

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  if (!email.trim() || !password) {
    return res.status(422).json({ message: 'Invalid Data' })
  }

  let existingUser

  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    console.error(err)
  }

  if (!existingUser) {
    return res.status(404).json({ message: 'No User Found' })
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Incorrect Password' })
  }

  const existingUserAccessToken = jwt.sign(
    { email: existingUser.email },
    process.env.ACCESS_TOKEN_SECRET
  )

  return res.status(200).json({
    message: 'Login Successfull',
    accessToken: existingUserAccessToken,
    userId: existingUser._id,
  })
}
