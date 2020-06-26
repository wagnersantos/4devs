import faker from 'faker'

import { LocalSaveAccesToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/test/mock-storage'

describe('LocalSaveAccesToken', () => {
  test('should call setStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccesToken(setStorageSpy)
    const accessToken = faker.random.uuid()

    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
