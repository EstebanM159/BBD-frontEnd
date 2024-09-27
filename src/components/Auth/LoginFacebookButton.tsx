import FacebookLogin from '@greatsumini/react-facebook-login'
import { loginFacebook } from '../../api/AuthApi'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import Msg from './Msg'

export default function LoginFacebookButton () {
  const appId = import.meta.env.VITE_FACEBOOK_API
  const { mutate } = useMutation({
    mutationFn: loginFacebook,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(<Msg data={data!}/>)
    }
  })
  return (
    <FacebookLogin
        appId={appId}
        onFail={(error) => {
          toast.error(error.status)
        }}
        onProfileSuccess={async (response) => {
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
