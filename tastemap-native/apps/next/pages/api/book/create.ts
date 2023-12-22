import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateBookRecord, CreateBookRequestBody } from './interface'
import { getSharedSupabaseClient } from 'utils/client'
import { withAuthentication } from 'utils/auth'
import { SuccessResponse } from '../interface'
import { User } from '@supabase/supabase-js'

async function handler(req: NextApiRequest, res: NextApiResponse, user: User) {
  const supabase = getSharedSupabaseClient()
  const createBookBody = CreateBookRequestBody.safeParse(req.body)

  if (!createBookBody.success) {
    return res.status(400).json({ error: 'Invalid input data' })
  }

  const {
    data: { id },
    error: getUserIdError,
  } = await supabase.from('native_user').select().eq('phone_number', user.phone).single()

  const book = CreateBookRecord.safeParse({
    type: createBookBody.data.type,
    category: createBookBody.data.category,
    amount: createBookBody.data.amount,
    user_id: id,
  })

  if (!book.success || getUserIdError || !id) {
    return res.status(401).json({ error: 'user_id is not found' })
  }

  const { error } = await supabase.from('native_book').insert({
    user_id: id,
    type: book.data.type,
    category: book.data.category,
    amount: book.data.amount,
  })

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
