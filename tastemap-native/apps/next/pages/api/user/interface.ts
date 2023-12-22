import { z } from 'zod'

export const AccountResponse = z.object({
  phone_number: z.string(),
  vendor_name: z.string(),
})
export type AccountResponse = z.infer<typeof AccountResponse>
