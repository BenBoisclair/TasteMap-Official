import { z } from 'zod'

export const LoginRequestBody = z.object({
  phone_number: z.string(),
})
export type LoginRequestBody = z.infer<typeof LoginRequestBody>

export const RefreshTokenBody = z.object({
  refresh_token: z.string(),
})
export type RefreshTokenBody = z.infer<typeof RefreshTokenBody>

export const VerificationRequestBody = z.object({
  phone_number: z.string(),
  otp_code: z.string(),
})
export type VerificationRequestBody = z.infer<typeof VerificationRequestBody>

export const AuthTokenResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expiration_date: z.string(),
})
export type AuthTokenResponse = z.infer<typeof AuthTokenResponse>
