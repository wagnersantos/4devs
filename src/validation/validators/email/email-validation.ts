import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/erros'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (input: object): Error {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const isValid = !input[this.field] || emailRegex.test(input[this.field])

    return isValid ? null : new InvalidFieldError()
  }
}
