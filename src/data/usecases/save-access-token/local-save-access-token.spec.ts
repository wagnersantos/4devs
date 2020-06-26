import faker from 'faker'

import { LocalSaveAccesToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test/mock-storage'

type SutTypes = {
  sut: LocalSaveAccesToken
  setStorageSpy: SetStorageSpy
};

const sutFactory = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccesToken(setStorageSpy)

  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccesToken', () => {
  test('should call setStorage with correct value', async () => {
    const { sut, setStorageSpy } = sutFactory()
    const accessToken = faker.random.uuid()

    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
