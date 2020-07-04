import { loginValidation } from './login-validation-factory'
import {
  ValidationComposite,
  RequiredFieldValidation,
  MinLengthValidation,
  EmailValidation
} from '@/validation/validators'

describe('LoginValidationoFactory', () => {
  it('should make compose validationComposite with correct validations', () => {
    const composite = loginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),

        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5)
      ])
    )
  })
})
