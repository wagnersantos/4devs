import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import Input from './input'

import Context from '@/presentation/contexts/form/form-context'

const sutFactory = (): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field" />
    </Context.Provider>
  )
}

describe('Input component', () => {
  it('should render', () => {
    const sut = sutFactory()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input).toBeTruthy()
  })
})
