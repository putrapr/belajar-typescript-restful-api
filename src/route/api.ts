import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { UserController } from '../controller/user-controller'
const { get, update } = UserController

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)
apiRouter.get('/api/users/current', get)
apiRouter.patch('/api/users/current', update)