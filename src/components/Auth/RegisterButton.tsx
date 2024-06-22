import FacebookLogin from '@greatsumini/react-facebook-login'
import { createUser } from '../../api/AuthApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function RegisterButton () {
  const appId = import.meta.env.VITE_FACEBOOK_API
  const navigate = useNavigate()
  return (
    <FacebookLogin
        appId={appId}
        onFail={(error) => {
          console.log('Login Failed!', error.status)
        }}
        onProfileSuccess={async (response) => {
          const result = await createUser(response)
          toast.success(result)
          navigate('/crear-turno')
        }}
        style={{
          height: '1.5rem',
          width: '1.5rem',
          background: 'transparent',
          backgroundImage: 'url(/facebook.svg)',
          backgroundRepeat: 'no-repeat',
          color: 'transparent'
        }}
    />
  )
}
