import faker from 'faker'
import { EmailValidation } from './email-validation'
import { InvalidaFieldError } from '@/validation/erros'

const sutFactory = (): EmailValidation =>
  new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = sutFactory()
    const error = sut.validate('')

    expect(error).toEqual(new InvalidaFieldError())
  })

  it('should return false if email is valid', () => {
    const sut = sutFactory()
    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })
})
