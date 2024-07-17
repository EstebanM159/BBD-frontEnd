import FacebookLogin from '@greatsumini/react-facebook-login'
import { createUser } from '../../api/AuthApi'
import { toast } from 'react-toastify'
export default function RegisterButton () {
  const appId = import.meta.env.VITE_FACEBOOK_API
  return (
    <FacebookLogin
        appId={appId}
        onProfileSuccess={async (response) => {
          const result = await createUser(response)
          toast.success(result)
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
