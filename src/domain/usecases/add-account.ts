import { AccountModel } from '@/domain/models/account-models'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation
};

export interface Authentication {
  auth: (params: AddAccountParams) => Promise<AccountModel>
}
