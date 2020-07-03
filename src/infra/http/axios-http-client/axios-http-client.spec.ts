import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'
import { mockPostRequest, mockGetRequest } from '@/data/test'
import { mockAxios, mockHttpResponse } from '@/infra/test'

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
  describe('post', () => {
    it('should  call axios.post with correct values', async () => {
      const { sut, mockedAxios } = sutFactory()
      const request = mockPostRequest()

      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should return the correct response on axios.post', async () => {
      const { sut, mockedAxios } = sutFactory()

      const httpResponse = await sut.post(mockPostRequest())
      const axiosResponse = await mockedAxios.post.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    it('should return correct error on axios.post', () => {
      const { sut, mockedAxios } = sutFactory()

      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.post(mockPostRequest())

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('get', () => {
    it('should  call axios.get with correct values', async () => {
      const { sut, mockedAxios } = sutFactory()
      const request = mockGetRequest()

      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    it('should return  the correct response on axios.get', async () => {
      const { sut, mockedAxios } = sutFactory()

      const httpResponse = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    it('should return correct error on axios.get', () => {
      const { sut, mockedAxios } = sutFactory()

      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.get(mockGetRequest())

      expect(promise).toEqual(mockedAxios.get.mock.results[0].value)
    })
  })
})