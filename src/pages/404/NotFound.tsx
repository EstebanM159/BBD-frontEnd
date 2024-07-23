import { Link } from 'react-router-dom'

export default function NotFound () {
  return (
    <div className="h-[85vh] w-full flex flex-col gap-10 items-center justify-items-start mt-10">
        <h1 className="text-4xl">Página no encontrada</h1>
        <Link to='/' className='border p-3 rounded-md hover:bg-ship-gray-500 hover:text-ship-gray-50 transition-all'>Volver a incio</Link>
    </div>
  )
}
