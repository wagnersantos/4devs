import React from 'react'
import faker from 'faker'
import { render, RenderResult } from '@testing-library/react'

import Input from './input'

import Context from '@/presentation/contexts/form/form-context'

const sutFactory = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

describe('Input component', () => {
  it('should render', () => {
    const field = faker.database.column()
    const sut = sutFactory(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    expect(input).toBeTruthy()
  })
})
