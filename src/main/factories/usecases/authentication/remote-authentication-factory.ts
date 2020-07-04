import { apiUrl } from '@/main/factories/http/api-url-factory'
import { axiosHttpClient } from '@/main/factories/http/axios-htpp-client-factory'
import { RemoteAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'

export const remoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(apiUrl('/login'), axiosHttpClient())
}
