import { AccountModel } from '../../../domain/models/account-models'

export type AuthenticationParams = {
  email: string
  passowrd: string
};

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
