import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { dateSchemaInicio, DateInicioT, DateT } from '../schemas/ShiftSchemas'
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
export async function getTimes (dateDay:DateInicioT['date']) {
  const { data } = await api<DateInicioT['time'][]>(`/dates/times-avaibles/${dateDay}`)
  console.log(data)
  return data
}
export async function deleteDate (dateId:DateInicioT['_id']) {
  try {
    const { data } = await api.delete<string>(`/dates/${dateId}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
    }
  }
}
export async function createDate (formData:DateT) {
  try {
    const { data } = await api.post<string>('/dates/new', formData)
    return data
  } catch (error) {

  }
}
