import { ProfileSuccessResponse } from '@greatsumini/react-facebook-login'
import { User } from '../schemas'
import api from '../lib/axios'
import { isAxiosError } from 'axios'

export async function createUser (response:ProfileSuccessResponse) {
  try {
    const { data } = await api.post<string>('/auth/create-account-withF', response)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function createAccount (formData:User) {
  try {
    const { data } = await api.post<string>('/auth/create-account', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function login (email:string) {
  try {
    const { data } = await api.post<string>('/auth/login', { email })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
