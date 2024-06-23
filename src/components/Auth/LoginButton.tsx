import FacebookLogin from '@greatsumini/react-facebook-login'
import { useNavigate } from 'react-router-dom'
import { loginFacebook } from '../../api/AuthApi'
import { toast } from 'react-toastify'

export default function LoginButton () {
  const appId = import.meta.env.VITE_FACEBOOK_API
  const navigate = useNavigate()
  return (
    <FacebookLogin
        appId={appId}
        onFail={(error) => {
          toast.error(error.status)
        }}
        onProfileSuccess={async (response) => {
          await loginFacebook(response.email!)
          toast.success('Iniciando...')
          navigate('/inicio')
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