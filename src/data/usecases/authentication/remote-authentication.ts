import { HttpPostClient, HttpStatuscCode } from '@/data/protocols/http'

import { AccountModel } from '@/domain/models'
import { AuthenticationParams, Authentication } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
    AuthenticationParams,
    AccountModel
    >
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatuscCode.ok:
        return httpResponse.body
      case HttpStatuscCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
