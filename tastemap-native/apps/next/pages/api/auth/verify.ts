import { VerificationRequestBody, AuthTokenResponse } from './interface'
import { getSharedSupabaseClient } from '../../../utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { timestampToISOString } from 'utils/date'
import { paddedCountryCode } from 'utils/phone'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data: parsedData, error: parseError } = parseRequestBody(req.body)
  if (parseError) {
    console.error(parseError)
    return res.status(400).json({ error: parseError })
  }
  const { phone_number, otp_code } = parsedData

  const { data: session, error: otpError } = await verifyOtp(phone_number, otp_code)
  if (otpError) {
    console.error(otpError)
    return res.status(401).json({ error: otpError })
  }

  const { error: dbError } = await upsertUserInDB(phone_number)
  if (dbError) {
    console.error(dbError)
    return res.status(401).json({ error: dbError })
  }

  res.status(200).json({
    data: AuthTokenResponse.parse({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expiration_date: timestampToISOString(session.expires_at as number),
    }),
  })
}

const parseRequestBody = (body: any) => {
  const result = VerificationRequestBody.safeParse(body)
  if (!result.success) return { error: 'Invalid input data' } as const

  return {
    data: {
      phone_number: result.data.phone_number,
      otp_code: result.data.otp_code,
    },
  } as const
}

const verifyOtp = async (phone_number: string, otp_code: string) => {
  const supabase = getSharedSupabaseClient()

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    phone: paddedCountryCode(phone_number),
    token: otp_code,
    type: 'sms',
  })

  if (error || !session || !session.access_token || !session.refresh_token || !session.expires_at) {
    return {
      error: error || 'Verification failed or session token missing.',
    } as const
  }

  return {
    data: session,
  } as const
}

const upsertUserInDB = async (phone_number: string) => {
  const supabase = getSharedSupabaseClient()

  const { error } = await supabase
    .from('native_user')
    .upsert({ phone_number: paddedCountryCode(phone_number) }, { onConflict: 'phone_number' })

  if (error) {
    return {
      error,
    } as const
  }

  return {
    data: null,
  } as const
}
