import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/erros'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly filedToCompare: string
  ) {}

  validate (input: object): Error {
    const isDiff = input[this.field] !== input[this.filedToCompare]

    return isDiff ? new InvalidFieldError() : null
  }
}
