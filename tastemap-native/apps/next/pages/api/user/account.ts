import type { NextApiRequest, NextApiResponse } from 'next'
import { getSharedSupabaseClient } from 'utils/client'
import { withAuthentication } from 'utils/auth'
import { AccountResponse } from './interface'
import { User } from '@supabase/supabase-js'
import { unpaddedCountryCode } from 'utils/phone'

async function handler(_: NextApiRequest, res: NextApiResponse, user: User) {
  const supabase = getSharedSupabaseClient()

  if (!user.phone) {
    return res.status(500).json({ error: "User's phone number is not found" })
  }

  const { data, error } = await supabase
    .from('vendor')
    .select()
    .eq('owner_telephone', unpaddedCountryCode(user.phone))
    .single()

  if (error) {
    console.error(error)
    return res.status(500).json({ error: error })
  }

  res.status(200).json({
    data: AccountResponse.parse({
      phone_number: unpaddedCountryCode(user.phone),
      vendor_name: data.name_th || '',
    }),
  })
}

export default withAuthentication(handler)
