import faker from 'faker'
import { InvalidFieldError } from '@/validation/erros'
import { MinLengthValidation } from './min-length-validation'

const sutFactory = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = sutFactory(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = sutFactory(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(6) })

    expect(error).toBeFalsy()
  })

  it('should return falsy if field does not exists in schema', () => {
    const sut = sutFactory('any_field')
    const error = sut.validate({
      invalidField: faker.random.alphaNumeric(6)
    })

    expect(error).toBeFalsy()
  })
})
