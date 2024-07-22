import { useQuery } from '@tanstack/react-query'
import { getTimes } from '../api/DateApi'

export const useDateTimes = (dateSelected:string) => {
  const { data: times } = useQuery({
    queryKey: ['times', dateSelected],
    queryFn: () => getTimes(dateSelected)
  })
  const horarios = [
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00'

  ]
  const horariosDisponibles = horarios.filter(horario => !times?.includes(horario))
  console.log(horariosDisponibles)
  return horariosDisponibles
}
