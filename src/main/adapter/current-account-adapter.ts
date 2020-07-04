import { AccountModel } from '@/domain/models'
import { localStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  localStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return localStorageAdapter().get('account')
}
