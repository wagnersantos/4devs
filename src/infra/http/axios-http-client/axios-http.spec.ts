import faker from 'faker'
import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const sutFactory = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  it('should  call axios with correct url', async () => {
    const sut = sutFactory()
    const url = faker.internet.url()

    await sut.post({ url })

    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
