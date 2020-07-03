import { AccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'
import { localStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  localStorageAdapter().set('account', account)
}
