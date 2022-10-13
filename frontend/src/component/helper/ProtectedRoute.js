import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user)
  if (loading) return null

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
export default ProtectedRoute
