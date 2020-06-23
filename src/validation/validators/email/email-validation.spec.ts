import faker from 'faker'
import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/erros'

const sutFactory = (): EmailValidation =>
  new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = sutFactory()
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if email is valid', () => {
    const sut = sutFactory()
    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const sut = sutFactory()
    const error = sut.validate('')

    expect(error).toBeFalsy()
  })
})
