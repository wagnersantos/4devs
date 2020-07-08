import { apiUrl } from '@/main/factories/http'
import { LoadSurveyResult } from '@/domain/usecases'
import { RemoteLoadSurveyResult } from '@/data/usecases'
import { authorizeHttpClientDecorator } from '@/main/factories/decorators'

export const remoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(apiUrl(`/surveys/${id}/results`), authorizeHttpClientDecorator())
}
