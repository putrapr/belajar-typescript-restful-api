import express from 'express'
import { UserController } from '../controller/user-controller'
const { register, login } = UserController

export const publicRouter = express.Router()
publicRouter.post('/api/users', register)
publicRouter.post('/api/users/login', login)