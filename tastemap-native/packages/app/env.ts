import z from 'zod'

const envSchema = z.object({
  PUBLIC_API_URL: z.string(),
})

const env = {
  PUBLIC_API_URL: __DEV__ ? 'http://localhost:3000' : 'https://tastemap.com',
}

export default envSchema.parse(env)
