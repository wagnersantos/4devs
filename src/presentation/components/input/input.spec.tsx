import React from 'react'
import { render } from '@testing-library/react'

import Input from './input'

import Context from '@/presentation/contexts/form/form-context'

describe('Input component', () => {
  it('should render', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    )

    const input = getByTestId('field') as HTMLInputElement
    expect(input).toBeTruthy()
  })
})
