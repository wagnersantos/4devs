import { RequiredFieldValidation } from './required-field-validation'
import { RequiredFieldError } from '@/validation/erros'

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
})
