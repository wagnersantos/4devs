import { apiUrl } from '@/main/factories/http'
import { LoadSurveyList } from '@/domain/usecases'
import { RemoteLoadSurveyList } from '@/data/usecases'
import { authorizeHttpGetClientDecorator } from '@/main/factories/decorators'

export const remoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(apiUrl('/surveys'), authorizeHttpGetClientDecorator())
}
