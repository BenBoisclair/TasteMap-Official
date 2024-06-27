import { getAuthStorage } from './storage'
import env from 'app/env'

type FetchOptions = RequestInit & {
  headers?: Record<string, string>
}

const fetchAt =
  (host: string) =>
  (path: string, options = {}) =>
    fetch(`${host}/api${path}`, options)

const fetchAtApi = fetchAt(env.PUBLIC_API_URL)

const fetchWithContentTypeOf =
  (contentType: string) =>
  (method: string) =>
  (path: string, body = {}, options: FetchOptions = {}) => {
    const baseOptions = {
      ...options,
      method,
      headers: {
        ...options.headers,
        'Content-Type': contentType,
      },
    }
    const finalOptions =
      Object.keys(body).length !== 0 ? { ...baseOptions, body: JSON.stringify(body) } : baseOptions

    return fetchAtApi(path, finalOptions)
  }

const fetchJsonMethodOf = fetchWithContentTypeOf('application/json')

const withBindAuth = async (
  fetchFunction: (path: string, body: any, options: {}) => Promise<Response>
) => {
  const [getAuth] = getAuthStorage()
  const auth = await getAuth()
  return async (path: string, body = {}, options: FetchOptions = {}) => {
    const headers = options.headers
      ? { ...options.headers, Authorization: `Bearer ${auth.access_token}` }
      : { Authorization: `Bearer ${auth.access_token}` }
    return fetchFunction(path, body, { ...options, headers })
  }
}

const createApiRequester = (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') => {
  return async (path: string, body = {}, options = {}) => {
    try {
      const postWithAuth = await withBindAuth(fetchJsonMethodOf(method))
      const response = await (await postWithAuth(path, body, options)).json()

      return response.error ? { error: response.error } : { data: response.data }
    } catch (error) {
      return {
        error: error,
      } as const
    }
  }
}

export const getApi = createApiRequester('GET')
export const postApi = createApiRequester('POST')
export const putApi = createApiRequester('PUT')
export const patchApi = createApiRequester('PATCH')
export const deleteApi = createApiRequester('DELETE')
