export enum HttpStatuscCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T> = {
  statusCode: HttpStatuscCode
  body?: any
};