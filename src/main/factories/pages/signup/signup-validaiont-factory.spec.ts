import { signupValidation } from './signup-validation-factory'
import {
  ValidationComposite,
  RequiredFieldValidation,
  MinLengthValidation,
  EmailValidation,
  CompareFieldsValidation
} from '@/validation/validators'

describe('SignUpValidationoFactory', () => {
  it('should make compose validationComposite with correct validations', () => {
    const composite = signupValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 5),

        new RequiredFieldValidation('email'),
        new EmailValidation('email'),

        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),

        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldsValidation('passwordConfirmation', 'password')

      ])
    )
  })
})
