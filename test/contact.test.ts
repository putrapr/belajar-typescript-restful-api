import { ContactTest, UserTest } from './util.test'
import supertest from 'supertest'
import { web } from '../src/application/web'
import { logger } from '../src/application/logging'

// describe('POST /api/contacts', () => {
  // beforeEach(async () => await UserTest.create())
  // afterEach(async () => {
  //   await ContactTest.deleteAll()
  //   await UserTest.delete()
  // })

  // it('should create new contact', async () => {
  //   const response = await supertest(web)
  //     .post('/api/contacts')
  //     .set('X-API-TOKEN', 'test')
  //     .send({
  //       first_name: 'putra',
  //       last_name: 'prasetya',
  //       email: 'putraprasetya@gmail.com',
  //       phone: '089789567234'
  //     })
    
  //   logger.debug(response.body)
  //   expect(response.status).toBe(200)
  //   expect(response.body.data.id).toBeDefined()
  //   expect(response.body.data.first_name).toBe('putra')
  //   expect(response.body.data.last_name).toBe('prasetya')
  //   expect(response.body.data.email).toBe('putraprasetya@gmail.com')
  //   expect(response.body.data.phone).toBe('089789567234')
  // })

  // it('should reject create new contact if data is invalid', async () => {
  //   const response = await supertest(web)
  //     .post('/api/contacts')
  //     .set('X-API-TOKEN', 'test')
  //     .send({
  //       first_name: '',
  //       last_name: '',
  //       email: 'putra',
  //       phone: 'kosongdelapan'
  //     })
    
  //   logger.debug(response.body)
  //   expect(response.status).toBe(400)
  //   expect(response.body.errors).toBeDefined()
  // })
// })

// describe('GET /api/contact/:contactId', () => {
//   beforeEach(async () => {
//     await UserTest.create()
//     await ContactTest.create()
//   })
//   afterEach(async () => {
//     await ContactTest.deleteAll()
//     await UserTest.delete()
//   })

//   it('should be able get contact', async () => {
//     const contact = await ContactTest.get()
//     const response = await supertest(web)
//       .get(`/api/contacts/${contact.id}`)
//       .set('X-API-TOKEN', 'test')
    
//     logger.debug(response.body)
//     expect(response.status).toBe(200)
//     expect(response.body.data.id).toBeDefined()
//     expect(response.body.data.first_name).toBe(contact.first_name)
//     expect(response.body.data.last_name).toBe(contact.last_name)
//     expect(response.body.data.email).toBe(contact.email)
//     expect(response.body.data.phone).toBe(contact.phone)
//   })

//   it('should reject get contact if contact is not found', async () => {
//     const contact = await ContactTest.get()
//     const response = await supertest(web)
//       .get(`/api/contacts/${contact.id + 1}`)
//       .set('X-API-TOKEN', 'test')
    
//     logger.debug(response.body)
//     expect(response.status).toBe(404)
//     expect(response.body.errors).toBeDefined()
//   })
// })

describe('PUT / api/contacts/:contactId', () => {
  beforeEach(async () => {
    await UserTest.create()
    await ContactTest.create()
  })

  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

  it('should be able to update contact', async () => {
    const contact = await ContactTest.get()
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: 'putra',
        last_name: 'prasetya',
        email: 'putra@example.com',
        phone: '089123456789'
      })
    
      logger.debug(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBe(contact.id)
      expect(response.body.data.first_name).toBe('putra')
      expect(response.body.data.last_name).toBe('prasetya')
      expect(response.body.data.email).toBe('putra@example.com')
      expect(response.body.data.phone).toBe('089123456789')
  })

  it('should reject update contact if request is invalid', async () => {
    const contact = await ContactTest.get()
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: '',
        last_name: '',
        email: 'putra',
        phone: ''
      })
    
      logger.debug(response.body)
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
  })
})