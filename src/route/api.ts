import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { UserController } from '../controller/user-controller'
const { get, update, logout } = UserController
import { ContactController } from '../controller/contact-controller'
const { create } = ContactController

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

// User API
apiRouter.get('/api/users/current', get)
apiRouter.patch('/api/users/current', update)
apiRouter.delete('/api/users/current', logout)

// Contact API
apiRouter.post('/api/contacts', create)