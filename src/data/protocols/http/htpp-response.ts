export enum HttpStatuscCode {
  noContent = 204,
  unathorized = 401,
}

export type HttpResponse = {
  statusCode: HttpStatuscCode
  body?: any
};
