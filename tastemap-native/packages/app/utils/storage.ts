import { Platform } from 'react-native'
import env from 'app/env'
import { RefreshTokenBody, AuthTokenResponse } from '../../../apps/next/pages/api/auth/interface'

export enum AuthKey {
  access_token = 'AUTH_ACCESS_TOKEN',
  refresh_token = 'AUTH_REFRESH_TOKEN',
  expiration_date = 'AUTH_EXPIRATION_DATE',
}

export interface AuthData {
  access_token: string
  refresh_token: string
  expiration_date: string
}

export const partialGetAuthStorage = (
  get: (key: AuthKey) => Promise<string>,
  set: (key: AuthKey, value: string) => Promise<void>
) => {
  const getAuth = async () => {
    const [accessToken, refreshToken, expiration_date] = await Promise.all([
      get(AuthKey.access_token),
      get(AuthKey.refresh_token),
      get(AuthKey.expiration_date),
    ])

    return {
      access_token: accessToken || '',
      refresh_token: refreshToken || '',
      expiration_date: expiration_date || '',
    }
  }

  const isAccessTokenValid = (expiration_date: string) => {
    const expirationDateUtc = new Date(expiration_date)
    const currentDateUtc = new Date(new Date().toISOString())

    return currentDateUtc < expirationDateUtc
  }

  const setAuthToSecureStore = async (authData: AuthData) => {
    await Promise.all([
      set(AuthKey.access_token, authData.access_token),
      set(AuthKey.refresh_token, authData.refresh_token),
      set(AuthKey.expiration_date, authData.expiration_date),
    ])
  }

  const resetAuthStorage = async () => {
    await setAuthToSecureStore({
      access_token: '',
      refresh_token: '',
      expiration_date: '',
    })
  }

  const refreshAccessToken = async (authData: AuthData) => {
    if (authData.expiration_date !== '' && !isAccessTokenValid(authData.expiration_date)) {
      const refreshTokenBody = RefreshTokenBody.parse({
        refresh_token: authData.refresh_token,
      })

      const authDataResponse = await (
        await fetch(`${env.PUBLIC_API_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(refreshTokenBody),
        })
      ).json()

      const newAuthData = AuthTokenResponse.safeParse(authDataResponse.data)

      if (authDataResponse.error || !newAuthData.success) {
        await resetAuthStorage()
        return await getAuth()
      }
      return newAuthData.data
    }
    return authData
  }

  const setAuthToSecureStoreCallback = async (callback: (authData: AuthData) => AuthData) => {
    const currentAuthData = await getAuth()
    const updatedAuthData = callback(currentAuthData)
    await setAuthToSecureStore(updatedAuthData)
  }

  const getValidAuth = async () => {
    const authData = await getAuth()
    const newAuthData = await refreshAccessToken(authData)
    await setAuth(newAuthData)
    return newAuthData
  }

  const setAuth = async (setAuthAction: AuthData | ((authData: AuthData) => AuthData)) => {
    return typeof setAuthAction === 'function'
      ? setAuthToSecureStoreCallback(setAuthAction)
      : setAuthToSecureStore(setAuthAction)
  }

  return [getValidAuth, setAuth] as const
}

const getAuthStorageWeb = () => {
  const webGet = async (authKey: AuthKey) => localStorage.getItem(authKey) || ''
  const webSet = async (authKey: AuthKey, value: string) => localStorage.setItem(authKey, value)

  return partialGetAuthStorage(webGet, webSet)
}

const getAuthStorageExpo = () => {
  const SecureStore = require('expo-secure-store')

  const nativeGet = async (authKey: AuthKey) => (await SecureStore.getItemAsync(authKey)) || ''
  const nativeSet = async (authKey: AuthKey, value: string) =>
    await SecureStore.setItemAsync(authKey, value)

  return partialGetAuthStorage(nativeGet, nativeSet)
}

export const getAuthStorage = Platform.OS === 'web' ? getAuthStorageWeb : getAuthStorageExpo
