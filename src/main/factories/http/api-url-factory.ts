export const apiUrl = (path: string): string => {
  return `${process.env.API_URL}${path}`
}
