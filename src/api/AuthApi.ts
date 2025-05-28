import { ProfileSuccessResponse } from '@greatsumini/react-facebook-login'
import { ForgotPasswordForm, ForgotPasswordToken, NewPasswordT, User, UserActiveSchema, UserLogin } from '../schemas'
import api from '../lib/axios'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { CredentialResponse } from '@react-oauth/google'

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
      throw new Error(error.response.data.error)
    }
  }
}

export async function loginWithEmail (formData:UserLogin) {
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
export async function createAccountWithGoogle (credential:CredentialResponse) {
  try {
    const { data } = await api.post<string>('/auth/createAccount-withG', credential)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function loginWithGoogle (credential:CredentialResponse) {
  try {
    const { data } = await api.post<string>('/auth/login-withG', credential)
    localStorage.setItem('access_token', data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error)
      throw new Error(error.response.data.error)
    }
  }
}
export async function getUser () {
  try {
    console.log('ejecuta')
    const { data } = await api('/auth/user')
    const result = UserActiveSchema.safeParse(data)
    if (result.success) return result.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function forgotPassword (formData: ForgotPasswordForm) {
  try {
    const { data } = await api.post('/auth/forgotPassword', formData)
    console.log(data)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function validateToken (formData:ForgotPasswordToken) {
  try {
    const { data } = await api.post<string>('/auth/validate-token', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
export async function updatePasswordWithToken ({ formData, token }:{formData:NewPasswordT, token:ForgotPasswordToken['token']}) {
  try {
    const { data } = await api.post<string>(`/auth//update-password/${token}`, formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
