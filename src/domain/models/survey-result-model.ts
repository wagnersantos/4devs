export type SurveyResultModel = {
  question: string
  date: Date
  answers: SurveyResultAnswewrModel[]
};

export type SurveyResultAnswewrModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
