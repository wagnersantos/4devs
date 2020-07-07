import faker from 'faker'

import { HttpGetClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import { HttpStatuscCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy
};

const sutFactory = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  it('should call httpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = sutFactory(url)
    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.ok,
      body: mockRemoteSurveyResultModel()
    }
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })

  it('Should throw AccessDeniedError if HttpPostClient return 403', async () => {
    const { sut, httpGetClientSpy } = sutFactory()
    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throw unexpectedError if HttpPostClient return 404', async () => {
    const { sut, httpGetClientSpy } = sutFactory()
    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.notFound
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw unexpectedError if HttpPostClient return 500', async () => {
    const { sut, httpGetClientSpy } = sutFactory()
    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return a list of suveryResult on 200', async () => {
    const { sut, httpGetClientSpy } = sutFactory()
    const httpResult = mockRemoteSurveyResultModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.ok,
      body: httpResult
    }
    const surveyResult = await sut.load()
    expect(surveyResult).toEqual({
      question: httpResult.question,
      date: new Date(httpResult.date),
      answers: httpResult.answers
    })
  })
})
