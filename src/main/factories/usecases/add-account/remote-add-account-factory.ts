import { apiUrl } from '@/main/factories/http/api-url-factory'
import { axiosHttpClient } from '@/main/factories/http/axios-htpp-client-factory'
import { AddAccount } from '@/domain/usecases'
import { RemoteAddAccount } from '@/data/usecases'

export const remoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(apiUrl('/signup'), axiosHttpClient())
}
