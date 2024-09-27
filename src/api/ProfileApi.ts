// /profile/update-profile

import { ChangePasswordForm, UpdateProfile } from '../schemas'
import api from '../lib/axios'
import { isAxiosError } from 'axios'

export async function changePassword (formData :ChangePasswordForm) {
  try {
    const { data } = await api.put('profile/change-password', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
//

export async function updateProfile (formData :UpdateProfile) {
  try {
    const { data } = await api.put('profile/update-profile', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
