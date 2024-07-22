import { useQuery } from '@tanstack/react-query'
import { getDateById } from '../api/DateApi'

export const useDate = (dateId:string) => {
  const { data } = useQuery({
    queryKey: ['dateEdit', dateId],
    queryFn: () => getDateById(dateId)
  })
  if (data) {
    return data
  }
}
