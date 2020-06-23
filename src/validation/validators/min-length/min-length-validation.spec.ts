import faker from 'faker'
import { InvalidFieldError } from '@/validation/erros'
import { MinLengthValidation } from './min-length-validation'

const sutFactory = (): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), 6)

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = sutFactory()
    const error = sut.validate(faker.random.alphaNumeric(5))

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const sut = sutFactory()
    const error = sut.validate(faker.random.alphaNumeric(6))

    expect(error).toBeFalsy()
  })
})
