import type { NextApiRequest, NextApiResponse } from 'next'
import { getSharedSupabaseClient } from 'utils/client'
import { timestampToISOString } from 'utils/date'
import { AuthTokenResponse, RefreshTokenBody } from './interface'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = getSharedSupabaseClient()
  console.log('start refreshing')
  const refreshTokenBody = RefreshTokenBody.safeParse(req.body)
  if (!refreshTokenBody.success) {
    return res.status(400).json({ error: 'Invalid input data' })
  }
  console.log('refreshTokenBody', refreshTokenBody)

  const {
    data: { session },
    error,
  } = await supabase.auth.refreshSession({
    refresh_token: refreshTokenBody.data.refresh_token,
  })
  console.log('new session', session)

  if (error || !session || !session.access_token || !session.refresh_token || !session.expires_at) {
    const errorMsg = error ? error.message : 'Verification failed or session token missing.'
    console.error(errorMsg)
    return res.status(401).json({ error: errorMsg })
  }
  console.log('returning', {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expiration_date: timestampToISOString(session.expires_at),
  })

  res.status(200).json({
    data: AuthTokenResponse.parse({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expiration_date: timestampToISOString(session.expires_at),
    }),
  })
}
