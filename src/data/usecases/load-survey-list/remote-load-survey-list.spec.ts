import faker from 'faker'

import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test'
import { HttpStatuscCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
};

const sutFactory = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  it('should call httpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = sutFactory(url)
    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(url)
  })

  it('Should throw unexpectedError if HttpPostClient return 403', async () => {
    const { sut, httpGetClientSpy } = sutFactory()

    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.forbidden
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw unexpectedError if HttpPostClient return 404', async () => {
    const { sut, httpGetClientSpy } = sutFactory()

    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.notFound
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw unexpectedError if HttpPostClient return 500', async () => {
    const { sut, httpGetClientSpy } = sutFactory()

    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.forbidden
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return a list of suveryModels if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = sutFactory()
    const httpResult = mockRemoteSurveyListModel()

    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.ok,
      body: httpResult
    }

    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual([{
      id: httpResult[0].id,
      question: httpResult[0].question,
      didAnswer: httpResult[0].didAnswer,
      date: new Date(httpResult[0].date)
    }, {
      id: httpResult[1].id,
      question: httpResult[1].question,
      didAnswer: httpResult[1].didAnswer,
      date: new Date(httpResult[1].date)
    }, {
      id: httpResult[2].id,
      question: httpResult[2].question,
      didAnswer: httpResult[2].didAnswer,
      date: new Date(httpResult[2].date)
    }])
  })

  it('Should return an empty list of suveryModels if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = sutFactory()

    httpGetClientSpy.response = {
      statusCode: HttpStatuscCode.noContent
    }

    const surveyList = await sut.loadAll()

    expect(surveyList).toEqual([])
  })
})
