import { ContactTest, UserTest } from './util.test'
import supertest from 'supertest'
import { web } from '../src/application/web'
import { logger } from '../src/application/logging'

describe('POST /api/contacts', () => {
  beforeEach(async () => await UserTest.create())
  afterEach(async () => {
    await ContactTest.deleteAll()
    await UserTest.delete()
  })

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

  it('should reject create new contact if data is invalid', async () => {
    const response = await supertest(web)
      .post('/api/contacts')
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: '',
        last_name: '',
        email: 'putra',
        phone: 'kosongdelapan'
      })
    
    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
})