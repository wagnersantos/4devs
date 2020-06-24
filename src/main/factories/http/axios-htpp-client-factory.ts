import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

export const axiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
