import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/erros'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valuteToCompare: string
  ) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
