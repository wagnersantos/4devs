import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter
} from './current-account-adapter'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { UnexpectedError } from '@/domain/errors'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  it('should call LocalStorageAdapter.set with correct value', () => {
    const account = mockAccountModel()
    const setSPy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    expect(setSPy).toHaveBeenCalledWith('account', account)
  })

  it('should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })

  it('should call LocalStorageAdapter.get with correct value', () => {
    const account = mockAccountModel()
    const getSPy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account)

    const result = getCurrentAccountAdapter()

    expect(getSPy).toHaveBeenCalledWith('account')
    expect(result).toEqual(account)
  })
})
