import faker from 'faker'

import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { mockAuthenticantion } from '@/domain/test/mock-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const sutFactory = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = sutFactory(url)

    await sut.auth(mockAuthenticantion())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should call HttpPostClient with with correct body', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    const authenticationParams = mockAuthenticantion()

    await sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })
})
