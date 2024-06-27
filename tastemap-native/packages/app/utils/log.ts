import lineNotify from 'simple-line-notify'
import env from 'app/env'

const initLogger = () => {
  const notify = lineNotify(env.PUBLIC_DEV_LOG_ENV)
  return {
    log: (msg: {}) => {
      console.log(`log: ${msg}`)
      notify.sendMessage(`log: ${JSON.stringify(msg, null, 4)}`)
    },
    error: (msg: {}) => {
      console.log(`error: ${msg}`)
      notify.sendMessage(`error: ${JSON.stringify(msg, null, 4)}`)
    },
  }
}

const loggerSingleton = () => {
  let logger: { log: (msg: {}) => void; error: (msg: {}) => void } | null = null
  if (!logger) {
    logger = initLogger()
  }
  return logger
}

export const logger = loggerSingleton()
