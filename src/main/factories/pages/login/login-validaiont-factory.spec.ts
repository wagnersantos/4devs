import { loginValidation } from './login-validation-factory'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

describe('LoginValidationoFactory', () => {
  it('should make compose validationComposite with correct validations', () => {
    const composite = loginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build()
      ])
    )
  })
})
