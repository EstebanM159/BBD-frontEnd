import { ProfileSuccessResponse } from '@greatsumini/react-facebook-login'
import { User, UserLogin } from '../schemas'
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
export async function loginFacebook (email:string) {
  try {
    const { data } = await api.post<string>('/auth/login', email)
    localStorage.setItem('AUTH_TOKEN', data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
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
