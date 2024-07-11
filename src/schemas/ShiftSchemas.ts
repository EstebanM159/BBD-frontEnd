import z from 'zod'
export const dateSchema = z.object({
  service: z.string(),
  date: z.string(),
  time: z.string()
})
export type Date = z.infer<typeof dateSchema>
