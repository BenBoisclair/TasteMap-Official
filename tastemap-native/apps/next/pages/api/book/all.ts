import { getStartAndEndOfTodayThailandTime } from 'utils/date'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSharedSupabaseClient } from 'utils/client'
import { withAuthentication } from 'utils/auth'
import { User } from '@supabase/supabase-js'
import { Books } from './interface'

async function handler(_: NextApiRequest, res: NextApiResponse, user: User) {
  const supabase = getSharedSupabaseClient()

  const {
    data: { id: userId },
    error: getUserIdError,
  } = await supabase.from('native_user').select().eq('phone_number', user.phone).single()

  if (getUserIdError || !userId) {
    return res.status(401).json({ error: 'user_id is not found' })
  }

  const { data, error } = await supabase.from('native_book').select().eq('user_id', userId)
  console.log(data, error)

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({
    data: Books.parse(data),
  })
}

export default withAuthentication(handler)
