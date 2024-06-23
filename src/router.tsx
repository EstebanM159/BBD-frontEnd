import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import DateForm from './components/DateForm'
import RegisterView from './pages/auth/RegisterView'
import LoginView from './pages/auth/LoginView'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './pages/date/Inicio'

export default function Router () {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<AppLayout/>}>
            <Route path='/inicio' element={<Inicio/>}/>
            <Route path='/crear-turno' element={<DateForm/>}/>
          </Route>
          <Route element={<AuthLayout/>}>
            <Route path="/" index element={<Home/>}/>
            <Route path='/auth/create-account' element={<RegisterView/>}/>
            <Route path='/auth/login' element={<LoginView/>}/>
          </Route>

      </Routes>
    </BrowserRouter>
  )
}