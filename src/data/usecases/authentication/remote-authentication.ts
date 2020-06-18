import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { AuthenticationParams } from '@/domain/usercases/authentication'
import { HttpStatuscCode } from '@/data/protocols/http/htpp-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatuscCode.unathorized:
        throw new InvalidCredentialsError()
      default:
        return Promise.resolve()
    }
  }
}
