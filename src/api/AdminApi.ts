import { isAxiosError } from 'axios'
import api from '../lib/axios'
import { dateAdminSchema } from '../schemas/ShiftSchemas'
import { toast } from 'react-toastify'
import { User, UserLogin } from '../schemas'
export async function getAllDates () {
  try {
    const { data } = await api('/admin')
    const result = dateAdminSchema.safeParse(data)
    if (result.success) {
      return result.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
    }
  }
}
export async function getDatesByDay (dateString:string) {
  try {
    const { data } = await api(`/admin/${dateString}`)
    const result = dateAdminSchema.safeParse(data)
    if (result.success) {
      return result.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
    }
  }
}
export async function createAdminAccount (formData:User) {
  try {
    const { data } = await api.post<string>('/admin/auth/create-account', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function loginWithEmail (formData:UserLogin) {
  try {
    const { data } = await api.post<string>('/admin/auth/login', formData)
    localStorage.setItem('access_token', data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
type deletePastAppointmentsProps ={
  dateString:string,
  time:string
}
export async function deletePastAppointments ({ dateString, time }:deletePastAppointmentsProps) {
  try {
    const { data } = await api.delete<string>(`admin/${dateString}/${time}/deletePastDates`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
