import faker from 'faker'

import { RemoteAuthentication } from './remote-authentication'

import { HttpPostClientSpy } from '@/data/test'
import { HttpStatuscCode } from '@/data/protocols/http'

import { mockAuthenticationParams, mockAuthenticationModel } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<Authentication.Params, Authentication.Model>
};

const sutFactory = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
  Authentication.Params,
  Authentication.Model
  >()
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

    await sut.auth(mockAuthenticationParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should call HttpPostClient with with correct body', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    const authenticationParams = mockAuthenticationParams()

    await sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  it('Should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.unauthorized
    }

    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.badRequest
    }

    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 500', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.serverError
    }

    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.notFound
    }

    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an Authentication.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    const httpResult = mockAuthenticationModel()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.ok,
      body: httpResult
    }

    const account = await sut.auth(mockAuthenticationParams())

    expect(account).toEqual(httpResult)
  })
})
