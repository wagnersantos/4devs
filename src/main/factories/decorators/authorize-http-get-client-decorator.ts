import { HttpGetClient } from '@/data/protocols/http'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { localStorageAdapter } from '@/main/factories/cache'
import { axiosHttpClient } from '@/main/factories/http'

export const authorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(localStorageAdapter(), axiosHttpClient())
}
