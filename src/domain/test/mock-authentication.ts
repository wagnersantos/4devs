import faker from 'faker'

import { AuthenticationParams } from '../../domain/usercases/authentication'

export const mockAuthenticantion = (): AuthenticationParams => ({
  email: faker.internet.email(),
  passowrd: faker.internet.password()
})
