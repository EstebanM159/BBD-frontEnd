import { ProfileSuccessResponse } from '@greatsumini/react-facebook-login'
import { User, UserLogin } from '../schemas'
import api from '../lib/axios'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

export async function createUser (response:ProfileSuccessResponse) {
  try {
    const { data } = await api.post<string>('/auth/create-account-withF', response)

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
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
export async function loginFacebook (email:string) {
  try {
    const { data } = await api.post<string>('/auth/login-withF', { email })
    localStorage.setItem('access_token', data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
    }
  }
}

export async function login (formData:UserLogin) {
  try {
    const { data } = await api.post<string>('/auth/login', formData)
    localStorage.setItem('access_token', data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getUser () {
  const { data } = await api('/auth/user')
  // zod para validar
  return data
}
