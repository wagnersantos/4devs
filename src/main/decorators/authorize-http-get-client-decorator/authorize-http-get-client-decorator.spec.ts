import faker from 'faker'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { mockGetRequest, GetStorageSpy, HttpGetClientSpy } from '@/data/test'
import { HttpGetParams } from '@/data/protocols/http'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
};

const sutFactory = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  )
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call getStorage witch correct value', async () => {
    const { sut, getStorageSpy } = sutFactory()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = sutFactory()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  it('should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = sutFactory()
    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should merge headers to httpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = sutFactory()
    getStorageSpy.value = mockAccountModel()

    const field = faker.random.words()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field
      }
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = sutFactory()
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual(httpGetClientSpy.response)
  })
})
