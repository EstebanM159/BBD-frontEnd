import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { dateSchemaInicio, DateInicioT, DateT } from '../schemas/ShiftSchemas'
import { toast } from 'react-toastify'

export async function getDateByClientId () {
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
export async function getDateById (dateId:DateInicioT['_id']) {
  const { data } = await api<DateInicioT>(`/dates/${dateId}`)
  const result = dateSchemaInicio.safeParse(data)
  if (result.success) {
    return result.data
  }
}

export async function getTimes (dateDay:DateInicioT['date']) {
  const { data } = await api<DateInicioT['time'][]>(`/dates/times-avaibles/${dateDay}`)
  return data
}
type UpdateDateType = {
  dateId:DateInicioT['_id'],
  formData:DateT
}
export async function updateDate ({ dateId, formData }:UpdateDateType) {
  const { data } = await api.put(`/dates/${dateId}/edit`, formData)
  return (data)
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
