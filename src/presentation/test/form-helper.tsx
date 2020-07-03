import faker from 'faker'
import { screen, fireEvent } from '@testing-library/react'

export const testChildCount = (
  fieldName: string,
  count: number
): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.children).toHaveLength(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = screen.getByTestId(fieldName)
  isDisabled ? expect(button).toBeDisabled() : expect(button).toBeEnabled()
}

export const testStatusForField = (
  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)

  const status = validationError ? 'invalid' : 'valid'

  expect(wrap).toHaveAttribute('data-status', status)
  expect(field).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
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
  const element = screen.queryByTestId(fieldName)
  expect(element).toBeInTheDocument()
}

export const testElementText = (
  fieldName: string,
  text: string
): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toHaveTextContent(text)
}
