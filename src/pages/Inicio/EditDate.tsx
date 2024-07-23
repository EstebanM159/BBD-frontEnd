import { useParams, Navigate } from 'react-router-dom'

import EditDateForm from '../../components/Inicio/EditDateForm'
import { useQuery } from '@tanstack/react-query'
import { getDateById } from '../../api/DateApi'

export default function EditDate () {
  const params = useParams()
  const dateId = params.dateId!
  const { data, isError } = useQuery({
    queryKey: ['dateEdit', dateId],
    queryFn: () => getDateById(dateId)
  })
  if (isError) return (<Navigate to={'/404'}/>)
  if (data) {
    return (
        <EditDateForm data={data} dateId={dateId}/>
    )
  }
}
