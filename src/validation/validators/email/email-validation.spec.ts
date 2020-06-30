import faker from 'faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/erros'

const sutFactory = (field: string): EmailValidation =>
  new EmailValidation(field)

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const field = faker.database.column()
    const sut = sutFactory(field)
    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if email is valid', () => {
    const field = faker.database.column()

    const sut = sutFactory(field)
    const error = sut.validate({ [field]: faker.internet.email() })

    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const field = faker.database.column()

    const sut = sutFactory(field)
    const error = sut.validate({ [field]: '' })

    expect(error).toBeFalsy()
  })
})
