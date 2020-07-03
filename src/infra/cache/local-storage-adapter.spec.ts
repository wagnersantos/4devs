import faker from 'faker'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'
import { AccountModel } from '@/domain/models'

const sutFactory = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should call localStorage with correct values', async () => {
    const sut = sutFactory()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })
})
