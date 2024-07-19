import z from 'zod'
export const dateSchema = z.object({
  service: z.string(),
  date: z.string(),
  time: z.string()
})
export const dateSchemaInicio = z.object({
  clientId: z.string(),
  date: z.string(),
  time: z.string(),
  _id: z.string()
})
export type DateT = z.infer<typeof dateSchema>
export type DateInicioT = z.infer<typeof dateSchemaInicio>
