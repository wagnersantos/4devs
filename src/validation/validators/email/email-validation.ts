import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidaFieldError } from '@/validation/erros'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new InvalidaFieldError()
  }
}
