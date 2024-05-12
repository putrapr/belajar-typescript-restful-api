import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { UserController as User } from '../controller/user-controller'
import { ContactController as Contact } from '../controller/contact-controller'
// const { create } = ContactController

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

// User API
apiRouter.get('/api/users/current', User.get)
apiRouter.patch('/api/users/current', User.update)
apiRouter.delete('/api/users/current', User.logout)

// Contact API
apiRouter.post('/api/contacts', Contact.create)
apiRouter.get('/api/contacts/:contactId(\\d+)', Contact.get)
apiRouter.put('/api/contacts/:contactId(\\d+)', Contact.update)