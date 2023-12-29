import z from 'zod'

const envSchema = z.object({
  PUBLIC_API_URL: z.string(),
})

const env = {
  PUBLIC_API_URL: 'https://taste-map-official.vercel.app',
}

export default envSchema.parse(env)
