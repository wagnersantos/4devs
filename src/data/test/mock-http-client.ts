import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatuscCode
} from '@/data/protocols/http'
export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatuscCode.ok
  };

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return this.response
  }
}
