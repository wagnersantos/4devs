import faker from 'faker'

import { RemoteAuthentication } from './remote-authentication'

import { HttpPostClientSpy } from '@/data/test'
import { HttpStatuscCode } from '@/data/protocols/http'

import { mockAuthenticantion, mockAccountModel } from '@/domain/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AuthenticationParams } from '@/domain/usercases'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
};

const sutFactory = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
  AuthenticationParams,
  AccountModel
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
      statusCode: HttpStatuscCode.unauthorized
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

  it('Should return an AccountModel if HttpPOstClient returns 200', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    const httpResult = mockAccountModel()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.ok,
      body: httpResult
    }

    const account = await sut.auth(mockAuthenticantion())

    expect(account).toEqual(httpResult)
  })
})
