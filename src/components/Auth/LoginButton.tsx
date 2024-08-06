import FacebookLogin from '@greatsumini/react-facebook-login'
import { loginFacebook } from '../../api/AuthApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

export default function LoginButton () {
  const navigate = useNavigate()
  const appId = import.meta.env.VITE_FACEBOOK_API
  const { mutate } = useMutation({
    mutationFn: loginFacebook,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      navigate('/')
    }
  })
  return (
    <FacebookLogin
        appId={appId}
        onFail={(error) => {
          toast.error(error.status)
        }}
        onProfileSuccess={(response) => {
          mutate(response.email!)
        }}
        style={{
          height: '1.5rem',
          width: '1.5rem',
          background: '#fff',
          backgroundImage: 'url(/facebook.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          color: 'transparent',
          padding: '1rem',
          borderRadius: '50%'
        }}
    />
  )
}
