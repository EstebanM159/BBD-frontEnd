import api from '../lib/axios'

export async function getDate () {
  try {
    const { data } = await api('/dates')
    return data
  } catch (error) {

  }
}
