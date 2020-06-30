import { signupValidation } from './signup-validation-factory'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

describe('SignUpValidationoFactory', () => {
  it('should make compose validationComposite with correct validations', () => {
    const composite = signupValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().min(5).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build(),
        ...Builder.field('passwordConfirmation').required().min(5).build()
      ])
    )
  })
})
