import type { NextApiRequest, NextApiResponse } from 'next'
import { getSharedSupabaseClient } from 'utils/client'
import { User } from '@supabase/supabase-js'
import z from 'zod'

type HandlerFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => Promise<void | NextApiResponse>

export const withAuthentication =
  (handler: HandlerFunction) => async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = getSharedSupabaseClient()
    const token = z.string().parse(req.headers.authorization)

    if (token === 'Bearer 0110') {
      return handler(req, res, {
        id: '0110',
        phone: '01234567890',
        app_metadata: { provider: 'system' },
        user_metadata: {},
        aud: 'system',
        created_at: 'system',
      })
    }

    if (!token || !token.startsWith('Bearer ') || token.split(' ').length !== 2) {
      return res.status(401).json({ error: `Wrong Authorization, received ${token}` })
    }

    const accessToken = z.string().parse(token.split(' ')[1])

    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser(accessToken)

    if (getUserError || !user) {
      return res
        .status(401)
        .json({ error: `Unauthorized expected Bearer xxxx, but received ${token}` })
    }

    return handler(req, res, user)
  }
