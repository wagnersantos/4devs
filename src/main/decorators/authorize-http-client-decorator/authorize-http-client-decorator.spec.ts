import faker from 'faker'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { mockHttpRequest, GetStorageSpy, HttpClientSpy } from '@/data/test'
import { HttpRequest } from '@/data/protocols/http'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
};

const sutFactory = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(
    getStorageSpy,
    httpClientSpy
  )
  return {
    sut,
    getStorageSpy,
    httpClientSpy
  }
}

describe('AuthorizeHttpClientDecorator', () => {
  it('should call getStorage witch correct value', async () => {
    const { sut, getStorageSpy } = sutFactory()
    await sut.request(mockHttpRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('should not add headers if getStorage is invalid', async () => {
    const { sut, httpClientSpy } = sutFactory()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field: faker.random.words()
      }
    }

    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
    expect(httpClientSpy.method).toEqual(httpRequest.method)
  })

  it('should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = sutFactory()
    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
    }

    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
    expect(httpClientSpy.method).toEqual(httpRequest.method)
  })

  it('should merge headers to httpGetClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = sutFactory()
    getStorageSpy.value = mockAccountModel()

    const field = faker.random.words()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field
      }
    }

    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
    expect(httpClientSpy.method).toEqual(httpRequest.method)
  })

  it('should return the same result as HttpGetClient', async () => {
    const { sut, httpClientSpy } = sutFactory()
    const httpResponse = await sut.request(mockHttpRequest())
    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
