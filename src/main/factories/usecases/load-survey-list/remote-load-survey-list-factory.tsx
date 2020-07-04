import { apiUrl } from '@/main/factories/http/api-url-factory'
import { axiosHttpClient } from '@/main/factories/http/axios-htpp-client-factory'
import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const remoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(apiUrl('/surveys'), axiosHttpClient())
}
