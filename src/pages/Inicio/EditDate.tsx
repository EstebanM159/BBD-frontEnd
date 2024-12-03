import { useParams, Navigate } from 'react-router-dom'

import EditDateForm from '../../components/Inicio/EditDateForm'
import { useQuery } from '@tanstack/react-query'
import { getDateById } from '../../api/DateApi'
import Spinner from '../../components/Spinner'

export default function EditDate () {
  const params = useParams()
  const dateId = params.dateId!
  const { data, isError, isLoading } = useQuery({
    queryKey: ['dateEdit', dateId],
    queryFn: () => getDateById(dateId)
  })
  if (isLoading) return (<Spinner/>)
  if (isError) return (<Navigate to={'/404'}/>)
  if (data) {
    return (
        <>
          <EditDateForm data={data} dateId={dateId}/>
        </>
    )
  }
}
