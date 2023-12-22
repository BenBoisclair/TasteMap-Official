import { getSharedSupabaseClient } from '../../../utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SuccessResponse } from '../interface'
import { LoginRequestBody } from './interface'
import { paddedCountryCode } from 'utils/phone'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = getSharedSupabaseClient()
  const loginRequestBody = LoginRequestBody.safeParse(req.body)

  if (!loginRequestBody.success || loginRequestBody.data.phone_number.length !== 10) {
    return res.status(400).json({ error: 'Invalid input data' })
  }

  const { phone_number } = loginRequestBody.data

  const { data, error } = await supabase.auth.signInWithOtp({
    phone: paddedCountryCode(phone_number),
  })

  if (error) {
    console.error({ error: error.message })
    return res.status(401).json({ error: error.message })
  }

  res.status(200).json({ data: SuccessResponse.parse({ success: !!data }) })
}
