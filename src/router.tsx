import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Home from './pages/auth/Home'
import DateForm from './pages/Inicio/CreateDate'
import RegisterView from './pages/auth/RegisterView'
import LoginView from './pages/auth/LoginView'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './pages/Inicio/Inicio'
import EditDate from './pages/Inicio/EditDate'
import NotFound from './pages/404/NotFound'
import AdminLayout from './layouts/AdminLayout'
import AdminInicio from './pages/admin/AdminInicio'
import ForgotPasswordView from './pages/auth/ForgotPasswordView'
import NewPasswordView from './pages/auth/NewPasswordView'
// import AdminRegisterView from './pages/admin/AdminRegisterView'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<AppLayout/>}>
            <Route path='/' index element={<Inicio/>}/>
            <Route path='/crear-turno' element={<DateForm/>}/>
            <Route path='/editar-turno/:dateId' element={<EditDate/>}/>
            <Route path='/404' element={<NotFound/>}/>
            <Route element={<AdminLayout/>}>
              <Route path='/admin' element={<AdminInicio/>}/>
              {/* <Route path='/admin/auth/create-account' index element={<AdminRegisterView/>}/> */}
              {/* <Route path='/admin/auth/login' index element={<LoginView/>}/> */}
            </Route>
          </Route>
          <Route element={<AuthLayout/>}>
            <Route path="/auth" element={<Home/>}/>
            <Route path='/auth/crear-cuenta' element={<RegisterView/>}/>
            <Route path='/auth/iniciar-sesion' element={<LoginView/>}/>
            <Route path='/auth/recuperar-contraseña' element={<ForgotPasswordView/>}/>
            <Route path='/auth/nueva-contraseña/:tokenId' element={<NewPasswordView/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/404"/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
