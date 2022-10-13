import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRouteAdmin = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user)

  if (loading) return null
  const userRole = user.role
  return isAuthenticated && userRole === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  )
}
export default ProtectedRouteAdmin
