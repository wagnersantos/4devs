import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClientspy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientspy)

    await sut.auth()

    expect(httpPostClientspy.url).toBe(url)
  })
})
