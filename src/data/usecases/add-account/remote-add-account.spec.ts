import faker from 'faker'

import { RemoteAddAccount } from './remote-add-account'
import { HttpPostClientSpy } from '@/data/test'
import { mockAddAccountParams, mockAddAccountModel } from '@/domain/test'
import { HttpStatuscCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, RemoteAddAccount.Model>
};

const sutFactory = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
  AddAccount.Params,
  RemoteAddAccount.Model
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = sutFactory(url)

    await sut.add(mockAddAccountParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should call HttpPostClient with with correct body', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    const addAccountParams = mockAddAccountParams()

    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  it('Should throw emailInUseError if HttpPostClient return 403', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.forbidden
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.badRequest
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 500', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.serverError
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    const { sut, httpPostClientSpy } = sutFactory()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.notFound
    }

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an AddAccount.Model if HttpPOstClient returns 200', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    const httpResult = mockAddAccountModel()

    httpPostClientSpy.response = {
      statusCode: HttpStatuscCode.ok,
      body: httpResult
    }

    const account = await sut.add(mockAddAccountParams())

    expect(account).toEqual(httpResult)
  })
})
