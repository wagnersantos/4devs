import faker from 'faker'

import { AddAccount } from '@/domain/usecases'

export const mockAccountModel = (): AddAccount.Model => ({
  accessToken: faker.random.uuid(),
  name: faker.name.findName()
})
