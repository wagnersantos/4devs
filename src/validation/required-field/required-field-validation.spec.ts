import faker from 'faker'

import { RequiredFieldValidation } from './required-field-validation'
import { RequiredFieldError } from '@/validation/erros'

const sutFactory = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = sutFactory()
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const sut = sutFactory()
    const error = sut.validate(faker.random.word())

    expect(error).toBeFalsy()
  })
})
