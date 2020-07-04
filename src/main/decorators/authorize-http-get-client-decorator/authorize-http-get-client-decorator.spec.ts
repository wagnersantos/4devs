import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { mockGetRequest, GetStorageSpy } from '@/data/test'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
};

const sutFactory = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy)

  return {
    sut,
    getStorageSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call getStorage witch correct value', () => {
    const { sut, getStorageSpy } = sutFactory()
    sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })
})
