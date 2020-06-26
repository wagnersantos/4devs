import { SetStorage } from '@/data/protocols/cache/set-storage'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const localStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
