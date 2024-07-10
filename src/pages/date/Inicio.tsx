import { useAuth } from '../../hooks/useAuth'

export default function Inicio () {
  const { data } = useAuth()

  if (data) {
    return (
    <>
      <section className="pt-6">
        <div className="flex items-center px-4 justify-between bg-ship-gray-50 w-full h-20 rounded-md">
            <h1 className='font-semibold text-xl'>Hola, {data?.userName}!</h1>
            {
                data?.picture.data.url === ''
                  ? (
                  <img src="./user.svg" className='bg-ship-gray-300 p-2 rounded-full' alt="foto perfil" />
                    )
                  : (
                  <img className='rounded-full' src={data.picture.data.url} width={data.picture.data.width} height={data.picture.data.height}/>
                    )
            }

        </div>
      </section>

      <h1 className="pt-4 text-3xl">Noticias</h1>
      <section className="pt-6">
        <div
          className="flex items-center px-4 justify-between border
          border-x-ship-gray-600 bg-ship-gray-400 w-full h-20 rounded-lg font-semibold">
            <img className="size-14" src="./desc.svg" alt="" />
            <h1>Hoy hay descuento del 25%</h1>
        </div>
      </section>
    </>

    )
  }
}
