import faker from 'faker'

import { RemoteAddAccount } from './remote-add-account'
import { HttpClientSpy } from '@/data/test'
import { mockAddAccountParams, mockAddAccountModel } from '@/domain/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>
};

const sutFactory = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<
  RemoteAddAccount.Model
  >()
  const sut = new RemoteAddAccount(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAddAccount', () => {
  it('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = sutFactory(url)
    const addAccountParams = mockAddAccountParams()

    await sut.add(addAccountParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(addAccountParams)
  })

  it('Should throw emailInUseError if HttpClient return 403', async () => {
    const { sut, httpClientSpy } = sutFactory()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('Should throw UnexpectedError if HttpClient return 400', async () => {
    const { sut, httpClientSpy } = sutFactory()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient return 500', async () => {
    const { sut, httpClientSpy } = sutFactory()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient return 404', async () => {
    const { sut, httpClientSpy } = sutFactory()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an AddAccount.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = sutFactory()
    const httpResult = mockAddAccountModel()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const account = await sut.add(mockAddAccountParams())

    expect(account).toEqual(httpResult)
  })
})
