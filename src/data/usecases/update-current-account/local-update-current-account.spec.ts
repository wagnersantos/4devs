import { LocalUpdateCurrentAccount } from './local-update-current-account'
import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
};

const sutFactory = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  it('should call setStorage with correct value', async () => {
    const { sut, setStorageMock } = sutFactory()
    const account = mockAccountModel()

    await sut.save(account)

    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  it('should throw if SetStorageMock throws', async () => {
    const { sut, setStorageMock } = sutFactory()

    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.save(mockAccountModel())

    await expect(promise).rejects.toThrow(new Error())
  })

  it('should throw if accessToken is falsy', async () => {
    const { sut } = sutFactory()

    const promise = sut.save(undefined)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
