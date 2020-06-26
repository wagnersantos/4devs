import faker from 'faker'

import { LocalSaveAccesToken } from './local-save-access-token'
import { SetStorageMock } from '@/data/test/mock-storage'

type SutTypes = {
  sut: LocalSaveAccesToken
  setStorageMock: SetStorageMock
};

const sutFactory = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccesToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccesToken', () => {
  it('should call setStorage with correct value', async () => {
    const { sut, setStorageMock } = sutFactory()
    const accessToken = faker.random.uuid()

    await sut.save(accessToken)

    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  it('should throw if SetStorageMock throws', async () => {
    const { sut, setStorageMock } = sutFactory()

    jest.spyOn(setStorageMock, 'set').mockRejectedValue(new Error())

    const promise = sut.save(faker.random.uuid())

    await expect(promise).rejects.toThrow(new Error())
  })
})
