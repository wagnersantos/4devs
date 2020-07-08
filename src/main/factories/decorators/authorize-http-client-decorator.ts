import { HttpClient } from '@/data/protocols/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { localStorageAdapter } from '@/main/factories/cache'
import { axiosHttpClient } from '@/main/factories/http'

export const authorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(localStorageAdapter(), axiosHttpClient())
}
