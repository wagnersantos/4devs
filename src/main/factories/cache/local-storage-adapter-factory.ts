import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export const localStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
