import faker from 'faker'

import { InvalidFieldError } from '@/validation/erros'
import { CompareFieldsValidation } from './compare-fields-validaion'

const sutFactory = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation =>
  new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_filed'

    const sut = sutFactory(field, fieldToCompare)
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if field compare is valid', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_filed'
    const value = faker.random.word()

    const sut = sutFactory(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
