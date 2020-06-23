import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/erros'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const isValid = !value || emailRegex.test(value)

    return isValid ? null : new InvalidFieldError()
  }
}
