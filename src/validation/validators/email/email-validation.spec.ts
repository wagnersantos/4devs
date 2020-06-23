import faker from 'faker'
import { EmailValidation } from './email-validation'
import { InvalidaFieldError } from '@/validation/erros'

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate('')

    expect(error).toEqual(new InvalidaFieldError())
  })

  it('should return false if email is valid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })
})
