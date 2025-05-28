import { Link } from 'react-router-dom'

export default function Msg ({ data }:{data:string}) {
  return (
    <Link to='/auth/iniciar-sesion'>{data} Cuenta creada, {' '}<span className='underline font-semibold'> Iniciar sesion</span></Link>
  )
}
