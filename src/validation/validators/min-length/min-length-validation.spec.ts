import { InvalidFieldError } from '@/validation/erros'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('123')

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('12345')

    expect(error).toBeFalsy()
  })
})
