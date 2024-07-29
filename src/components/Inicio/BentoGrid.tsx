import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function MyModal () {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const imagenes = [
    { id: 1, ruta: 'barber-1.webp' },
    { id: 2, ruta: 'barber-2.webp' },
    { id: 3, ruta: 'barber-3.webp' },
    { id: 4, ruta: 'barber-4.webp' }
  ]
  function closeModal () {
    setIsOpen(false)
  }

  function openModal (img:string) {
    setIsOpen(true)
    setCurrentUrl(img)
  }

  return (
    <>
        <div className="grid grid-cols-2 gap-4 mt-4 bg-envy-100 p-2">
            {
                imagenes.map(img => (
                    <img className='rounded-lg' key={img.id} src={img.ruta} onClick={() => openModal(img.ruta)}/>
                ))
            }
        </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-ship-gray-950/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-7 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md bg-envy-50 transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">

                  <div className="mt-2">
                    <img src={currentUrl} alt="" />
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
