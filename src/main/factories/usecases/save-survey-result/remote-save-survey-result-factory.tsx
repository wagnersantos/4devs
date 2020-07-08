import { apiUrl } from '@/main/factories/http'
import { SaveSurveyResult } from '@/domain/usecases'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import { authorizeHttpClientDecorator } from '@/main/factories/decorators'

export const remoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(apiUrl(`/surveys/${id}/results`), authorizeHttpClientDecorator())
}
