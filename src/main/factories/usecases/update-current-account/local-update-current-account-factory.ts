import { UpdateCurrentAccount } from '@/domain/usecases'
import { localStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'

export const localUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(localStorageAdapter())
}
