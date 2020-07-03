import faker from 'faker'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'
import { AccountModel } from '@/domain/models'

const sutFactory = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should call localStorage.setItem with correct values', async () => {
    const sut = sutFactory()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })

  it('should call localStorage.getItem with correct values', async () => {
    const sut = sutFactory()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value))

    const obj = sut.get(key)

    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
