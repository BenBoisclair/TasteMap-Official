import type { NextApiRequest, NextApiResponse } from 'next'
import { getSharedSupabaseClient } from 'utils/client'
import { withAuthentication } from 'utils/auth'
import { SuccessResponse } from '../interface'
import { User } from '@supabase/supabase-js'

async function handler(req: NextApiRequest, res: NextApiResponse, user: User) {
  const supabase = getSharedSupabaseClient()
  const { id } = req.query

  const {
    data: { id: userId },
    error: getUserIdError,
  } = await supabase.from('native_user').select().eq('phone_number', user.phone).single()

  if (getUserIdError || !userId) {
    const errorMsg = getUserIdError || 'user_id is not found'
    console.error(errorMsg)
    return res.status(401).json({ error: errorMsg })
  }

  const { data, error: accessError } = await supabase
    .from('native_book')
    .select()
    .eq('user_id', userId)
    .eq('id', id)
    .single()

  if (accessError || !data) {
    const errorMsg = accessError || 'user_id is not found'
    console.error(errorMsg)
    return res.status(401).json({ error: errorMsg })
  }

  const { error } = await supabase.from('native_book').delete().eq('id', id)

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({
    data: SuccessResponse.parse({
      success: true,
    }),
  })
}

export default withAuthentication(handler)
