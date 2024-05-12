import { ContactResponse, CreateContactRequest, SearchContactRequest, UpdateContactRequest, toContactResponse } from '../model/contact-model'
import { Validation } from '../validation/validation'
import { ContactValidation } from '../validation/contact-validation'
import { Contact, User } from '@prisma/client'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/error-response'

export class ContactService {
  static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
    const createRequest = Validation.validate(ContactValidation.CREATE, request)
    const record = {
      ...createRequest,
      ...{ username: user.username }
    }
    
    const contact = await prismaClient.contact.create({
      data: record
    })
    return toContactResponse(contact)
  }

  static async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username
      }
    })

    if (!contact)
      throw new ResponseError(404, 'Contact not found')

    return contact      
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id,
        username: user.username
      }
    })

    if(!contact)
      throw new ResponseError(404, 'Contact not found')

    return toContactResponse(contact)
  }

  static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
    const updateRequest = Validation.validate(ContactValidation.UPDATE, request)
    await this.checkContactMustExists(user.username, updateRequest.id)

    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username
      },
      data: updateRequest
    })
    return toContactResponse(contact)
  }

  static async remove(user: User, id: number): Promise<ContactResponse> {
    await this.checkContactMustExists(user.username, id)
    const contact = await prismaClient.contact.delete({
      where: {
        id,
        username: user.username
      }
    })
    return toContactResponse(contact)
  }

  static async search(user: User, request: SearchContactRequest): Promise<Pageable<ContactResponse>> {
    const searchRequest = Validation.validate(ContactValidation.SEARCH, request)
    const skip = (searchRequest.page - 1) * searchRequest.size

    const filters = []

    if (searchRequest.name) {
      filters.push({
        OR: [
          {
            first_name: { 
              contains: searchRequest.name 
            }
          },
          {
            last_name: {
              contains: searchRequest.name
            }
          }
        ]
      })
    }

    if (searchRequest.email) {
      filters.push({
        email: {
          contains: searchRequest.email
        }
      })
    }

    if (searchRequest.phone) {
      phone: {
        contains: searchRequest.phone
      }
    }
    
    const contacts = await prismaClient.contact.findMany({
      where: { 
        username: user.username,
        AND: filters
      },
      take: searchRequest.size,
      skip
    })

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters
      }
    })

    return {
      data: contacts.map(contact => toContactResponse(contact)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size
      }
    }

  }
}