import faker from 'faker'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const mockSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(10),
  didAnswer: faker.random.boolean(),
  date: faker.date.recent()
})

export const mockSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
]
