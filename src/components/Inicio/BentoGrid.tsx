export default function BentoGrid () {
  return (
     <div className="grid grid-cols-4 gap-4 mt-4 bg-envy-100">
          <div className="col-span-2 row-span-2">
              <img src="/1.jpg" alt="Imagen 1" className="object-cover w-full h-full"/>
          </div>
          <div className="col-span-1 row-span-1">
              <img src="/1.jpg" alt="Imagen 2" className="object-cover w-full h-full"/>
          </div>
          <div className="col-span-1 row-span-1">
              <img src="/1.jpg" alt="Imagen 3" className="object-cover w-full h-full"/>
          </div>
          <div className="col-span-1 row-span-1">
              <img src="/1.jpg" alt="Imagen 4" className="object-cover w-full h-full"/>
          </div>
          <div className="col-span-1 row-span-1">
              <img src="/1.jpg" alt="Imagen 5" className="object-cover w-full h-full"/>
          </div>
          <div className="col-span-3 row-span-1">
              <img src="/1.jpg" alt="Imagen 6" className="object-cover w-full h-full"/>
          </div>
    </div>
  )
}
