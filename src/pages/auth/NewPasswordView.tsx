import { useState } from 'react'
import { useParams } from 'react-router-dom'
import NewPasswordToken from '../../components/Auth/NewPasswordToken'
import NewPasswordForm from '../../components/Auth/NewPasswordForm'
import ButtonBack from '../../components/ButtonBack'

export default function NewPasswordView () {
  const params = useParams()
  const tokenId = params.tokenId!
  const [token, setToken] = useState<string>('')
  const [isValidToken, setIsValidToken] = useState(false)
  return (
    <>
      <div className='px-3 py-6 flex flex-col'>
        <ButtonBack route='/' />
        <div className='flex justify-center flex-col items-center h-[85vh]'>
        {
          !isValidToken
            ? <NewPasswordToken tokenId={tokenId} setToken={setToken} token={token} setIsValidToken={setIsValidToken}/>
            : <NewPasswordForm token={token}/>
        }
        </div>
      </div>
    </>
  )
}
