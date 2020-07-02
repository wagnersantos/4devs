import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'
import { mockPostRequest } from '@/data/test'
import { mockAxios, mockHttpRespnse } from '@/infra/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
};
const sutFactory = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('should  call axios with correct values', async () => {
    const { sut, mockedAxios } = sutFactory()
    const request = mockPostRequest()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return  the correct statusCode and body', () => {
    const { sut, mockedAxios } = sutFactory()

    const promise = sut.post(mockPostRequest())

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })

  it('should return  the correct statusCode and body on failure', () => {
    const { sut, mockedAxios } = sutFactory()

    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpRespnse()
    })

    const promise = sut.post(mockPostRequest())

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
