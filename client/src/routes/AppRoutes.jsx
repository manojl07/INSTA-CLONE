import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Feed from '../pages/Feed'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PublicRoute from '../components/PublicRoute'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={
          <PublicRoute><
            Login />
          </PublicRoute>} />

      <Route
        path='/register'
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>} />

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        } />

      <Route path='/profile/:userId' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

    </Routes>
  )
}

export default AppRoutes