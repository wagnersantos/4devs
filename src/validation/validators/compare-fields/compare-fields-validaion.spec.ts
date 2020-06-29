import faker from 'faker'

import { InvalidFieldError } from '@/validation/erros'
import { CompareFieldsValidation } from './compare-fields-validaion'

const sutFactory = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const sut = sutFactory(faker.random.word())
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError())
  })
})
