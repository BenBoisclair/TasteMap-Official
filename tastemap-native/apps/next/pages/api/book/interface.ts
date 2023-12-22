import { z } from 'zod'

const BookType = z.union([z.literal('INCOME'), z.literal('EXPENSE')])
export const Book = z.object({
  id: z.number(),
  user_id: z.number(),
  date: z.string(),
  type: BookType,
  category: z.string(),
  amount: z.string(),
})
export type Book = z.infer<typeof Book>

export const Books = z.array(Book)
export type Books = z.infer<typeof Books>

export const CreateBookRequestBody = z.object({
  type: BookType,
  category: z.string(),
  amount: z.string(),
})
export type CreateBookRequestBody = z.infer<typeof CreateBookRequestBody>

export const CreateBookRecord = z.object({
  user_id: z.number(),
  type: BookType,
  category: z.string(),
  amount: z.string(),
})
export type CreateBookRecord = z.infer<typeof CreateBookRequestBody>

export const UpdateBookRequestBody = z.object({
  id: z.number(),
  type: BookType,
  category: z.string(),
  amount: z.string(),
})
export type UpdateBookRequestBody = z.infer<typeof UpdateBookRequestBody>

export const UpdateBookRecord = z.object({
  id: z.number(),
  user_id: z.number(),
  type: BookType,
  category: z.string(),
  amount: z.string(),
})
export type UpdateBookRecord = z.infer<typeof UpdateBookRecord>
