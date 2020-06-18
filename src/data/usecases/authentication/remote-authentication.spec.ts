import faker from 'faker'

import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { HttpStatuscCode } from '@/data/protocols/http/htpp-response'
import { mockAuthenticantion } from '@/domain/test/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
};

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

  it('Should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.unathorized
    }

    const promise = sut.auth(mockAuthenticantion())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.badRequest
    }

    const promise = sut.auth(mockAuthenticantion())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 500', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.serverError
    }

    const promise = sut.auth(mockAuthenticantion())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.notFound
    }

    const promise = sut.auth(mockAuthenticantion())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
