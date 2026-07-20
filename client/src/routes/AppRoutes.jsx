import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../layouts/ProtectedRoute'
import Feed from '../pages/Feed'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Register from '../pages/Register'
import PublicRoute from '../layouts/PublicRoute'
import MainLayout from '../layouts/MainLayout'
import { ROUTES } from '../constants/routes'

const AppRoutes = () => {
  return (
    <Routes>


      <Route path={ROUTES.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />

      <Route path={ROUTES.REGISTER} element={<PublicRoute><Register /></PublicRoute>} />


      <Route path={ROUTES.HOME} element={
        <ProtectedRoute>
          <MainLayout>
            <Feed />
          </MainLayout>
        </ProtectedRoute>} />

      <Route path={ROUTES.PROFILE} element={
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>} />

      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default AppRoutes