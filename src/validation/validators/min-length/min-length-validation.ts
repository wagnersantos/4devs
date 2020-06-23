import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/erros'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}