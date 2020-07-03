import faker from 'faker'
import { screen, fireEvent } from '@testing-library/react'

export const testChildCount = (
  fieldName: string,
  count: number
): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDIsabled: boolean
): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDIsabled)
}

export const testStatusForField = (
  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)

  const status = validationError ? 'invalid' : 'valid'

  expect(wrap.getAttribute('data-status')).toBe(status)
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const fieldInput = screen.getByTestId(fieldName)
  fireEvent.input(fieldInput, { target: { value } })
}

export const testElementExists = (
  fieldName: string
): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (
  fieldName: string,
  text: string
): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
