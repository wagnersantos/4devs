import faker from 'faker'
import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpies: FieldValidationSpy[]
};

const sutFactory = (fieldName: string): SutTypes => {
  const fieldValidationsSpies = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = ValidationComposite.build(fieldValidationsSpies)

  return {
    sut,
    fieldValidationsSpies
  }
}

describe('ValidationComposite', () => {
  it('should return erro if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpies } = sutFactory(fieldName)
    const errorMessage = faker.random.words()

    fieldValidationsSpies[0].error = new Error(errorMessage)
    fieldValidationsSpies[1].error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(error)
  })

  it('should return erro if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut } = sutFactory(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
