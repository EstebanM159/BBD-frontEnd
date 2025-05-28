import { useQuery } from '@tanstack/react-query'
import { getUser } from '../api/AuthApi'

export const useAuth = () => {
  const { data, isError, isLoading, error } = useQuery(
    {
      queryKey: ['user'],
      queryFn: getUser,
      retry: 2,
      refetchOnWindowFocus: false
    }
  )
  const isAdmin = data?.role === 'admin'
  const canChangePassword = data?.facebook_id !== null || data.google_id !== null
  console.log(isError, error)
  return { data, isError, isLoading, error, isAdmin, canChangePassword }
}
