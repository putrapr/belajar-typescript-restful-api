import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware'
import { UserController as User } from '../controller/user-controller'
import { ContactController as Contact } from '../controller/contact-controller'
import { AddressController as Address, AddressController } from '../controller/address-controller'

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
apiRouter.delete('/api/contacts/:contactId(\\d+)', Contact.remove)
apiRouter.get('/api/contacts', Contact.search)

// Address API
apiRouter.post('/api/contacts/:contactId(\\d+)/addresses', Address.create)
apiRouter.get('/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)', Address.get)
apiRouter.put('/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)', Address.update)
apiRouter.delete('/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)', Address.remove)