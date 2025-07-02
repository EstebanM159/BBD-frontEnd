import Spinner from "./Spinner"
export default function LoadingPage() {
  return (
    <div className='w-full h-screen flex flex-col gap-5 items-center justify-center'>
                <Spinner spinnerClass='h-32 w-32'/>
                <p className="text-black text-center text-xl">Esta API está alojada en un servicio gratuito, por lo que las respuestas pueden tardar un poco más de lo esperado. Agradezco tu paciencia.</p>
              </div>
  )
}
