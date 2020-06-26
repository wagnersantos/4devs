import faker from 'faker'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'

const sutFactory = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should call localStorage with correct values', async () => {
    const sut = sutFactory()
    const key = faker.database.column()
    const value = faker.random.word()

    await sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
