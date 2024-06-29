import z from 'zod'

const envSchema = z.object({
  PUBLIC_API_URL: z.string(),
  PUBLIC_DEV_LOG_ENV: z.string(),
})

const env = {
  PUBLIC_API_URL: 'https://taste-map-official.vercel.app',
  //PUBLIC_API_URL: 'http://localhost:3000',
  PUBLIC_DEV_LOG_ENV: 'Bearer 1NiTg14ldFcJeBFKAou81BfsdLP9GDw6bHnhm3l4dSD',
}

export default envSchema.parse(env)
