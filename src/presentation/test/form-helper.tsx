import faker from 'faker'
import { RenderResult, fireEvent } from '@testing-library/react'

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDIsabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDIsabled)
}

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`)
  const field = sut.getByTestId(`${fieldName}`)
  const label = sut.getByTestId(`${fieldName}-label`)

  const status = validationError ? 'invalid' : 'valid'

  expect(wrap.getAttribute('data-status')).toBe(status)
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const populateField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.word()
): void => {
  const fieldInput = sut.getByTestId(fieldName)
  fireEvent.input(fieldInput, { target: { value } })
}

export const testElementExists = (
  sut: RenderResult,
  fieldName: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
