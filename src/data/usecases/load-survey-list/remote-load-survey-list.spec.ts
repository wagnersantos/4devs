import faker from 'faker'

import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatuscCode } from '@/data/protocols/http'
import { SurveyModel } from '@/domain/models'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
};

const sutFactory = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
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
})
