import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { mockGetRequest, GetStorageSpy } from '@/data/test'

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call getStorage witch correct value', () => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)
    sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })
})
