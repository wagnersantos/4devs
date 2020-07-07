import { apiUrl } from '@/main/factories/http'
import { LoadSurveyResult } from '@/domain/usecases'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import { authorizeHttpGetClientDecorator } from '@/main/factories/decorators'

export const remoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(apiUrl(`surveys/${id}/results`), authorizeHttpGetClientDecorator())
}
