import { useParams } from 'react-router-dom'

import { useDate } from '../../hooks/useDate'
import EditDateForm from '../../components/Inicio/EditDateForm'

export default function EditDate () {
  const params = useParams()
  const dateId = params.dateId!
  const data = useDate(dateId)

  if (data) {
    return (
        <EditDateForm data={data} dateId={dateId}/>
    )
  }
}
