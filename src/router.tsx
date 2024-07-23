import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Home from './pages/auth/Home'
import DateForm from './pages/Inicio/CreateDate'
import RegisterView from './pages/auth/RegisterView'
import LoginView from './pages/auth/LoginView'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './pages/Inicio/Inicio'
import EditDate from './pages/Inicio/EditDate'
import NotFound from './pages/404/NotFound'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<AppLayout/>}>
            <Route path='/' index element={<Inicio/>}/>
            <Route path='/crear-turno' element={<DateForm/>}/>
            <Route path='/editar-turno/:dateId' element={<EditDate/>}/>
            <Route path='/404' element={<NotFound/>}/>
          </Route>
          <Route element={<AuthLayout/>}>
            <Route path="/auth" element={<Home/>}/>
            <Route path='/auth/create-account' element={<RegisterView/>}/>
            <Route path='/auth/login' element={<LoginView/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}
