import { EmailValidation } from './email-validation'
import { InvalidaFieldError } from '@/validation/erros'

describe('EmailValidation', () => {
  it('should  return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('')

    expect(error).toEqual(new InvalidaFieldError())
  })
})
