import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { dateSchemaInicio } from '../schemas/ShiftSchemas'
import { toast } from 'react-toastify'

export async function getDate () {
  try {
    const { data } = await api('/dates')
    const result = dateSchemaInicio.safeParse(data)
    if (result.success) {
      return result.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
    }
  }
}
