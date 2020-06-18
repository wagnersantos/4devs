import {
  HttpPostClient,
  HttpPostParams
} from '@/data/protocols/http/http-post-client'
import {
  HttpResponse,
  HttpStatuscCode
} from '@/data/protocols/http/htpp-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatuscCode.ok
  };

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body

    return await Promise.resolve(this.response)
  }
}
