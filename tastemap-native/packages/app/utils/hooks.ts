import { useNavigation } from '@react-navigation/native'
import { useState, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import { useRouter } from 'solito/router'

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useTimer = (initialSeconds: number): [number, () => void] => {
  const [timer, setTimer] = useState<number>(initialSeconds)

  useEffect(() => {
    if (timer === 0) {
      return
    }

    const intervalId = setInterval(() => {
      setTimer((timer) => timer - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timer])

  const resetTimer = (): void => {
    setTimer(initialSeconds)
  }

  return [timer, resetTimer]
}

export const useCurrentRoute = () => {
  const [route, setRoute] = useState('')
  const nativeNavigation = Platform.OS === 'web' ? null : useNavigation().getState()

  const getCurrentRouteWeb = () => {
    return typeof window !== 'undefined' ? window.location.pathname : ''
  }

  const getCurrentRouteNative = () => {
    if (nativeNavigation === null) return
    return nativeNavigation.routes[nativeNavigation.index]?.name || ''
  }

  useEffect(() => {
    setRoute(Platform.OS === 'web' ? getCurrentRouteWeb() : `/${getCurrentRouteNative()}`)
  }, [])

  return route
}

export const useSlowRouter = () => {
  const { push } = useRouter()
  const slowPush = async (path: string) => {
    function sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    // fix bug in solito navigation not loading
    await sleep(100)
    push(path)
  }

  return { push: (path: string) => slowPush(path) }
}
