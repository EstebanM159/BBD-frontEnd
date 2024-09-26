import z from 'zod'
export const dateSchema = z.object({
  service: z.string(),
  date: z.string(),
  time: z.string()
})
export const dateSchemaInicio = z.object({
  clientId: z.string(),
  service: z.string(),
  date: z.string(),
  time: z.string(),
  _id: z.string()
})
export const dateAdmin = z.object({
  _id: z.string(),
  clientId: z.object({
    picture: z.string(),
    userName: z.string(),
    _id: z.string()
  }),
  date: z.string(),
  service: z.string(),
  time: z.string()
})
export const dateAdminSchema = z.array(dateAdmin)
export type DateAdmin = z.infer<typeof dateAdminSchema>
export type DateT = z.infer<typeof dateSchema>
export type DateInicioT = z.infer<typeof dateSchemaInicio>
