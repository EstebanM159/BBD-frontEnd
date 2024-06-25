import { useNavigate } from 'react-router-dom'
type ButtonBackProps = {
    route:string
}
export default function ButtonBack ({ route }:ButtonBackProps) {
  const navigate = useNavigate()
  return (
    <button className="w-10 flex " onClick={() => navigate(`${route}`)}>
        <img src="/chevron-left.svg" className="size-8 rounded-md shadow-ship-gray-200 shadow-sm" alt="" />
    </button>
  )
}
