import { SaveAccessToken } from '@/domain/usecases'
import { LocalSaveAccesToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { localStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const localSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccesToken(localStorageAdapter())
}
