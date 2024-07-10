type CardSeviceProps ={
    name:string,
    img:string
}
export default function CardSevice ({ name, img }:CardSeviceProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-2 size-32 border border-y-ship-gray-900 rounded-lg shadow-md hover:shadow-xl'>
          <img src={`./${img}.svg` } alt={`icono de ${img}` } className='size-20' />
          <p>{name}</p>
    </div>
  )
}
