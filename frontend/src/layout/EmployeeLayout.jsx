import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar'
import { Outlet } from 'react-router-dom'
import EmployeeFooter from '../components/EmployeeFooter'

const EmployeeLayout = () => {
  return (
    <>
      <EmployeeNavbar />
      <Outlet />
      <EmployeeFooter />
    </>
  )
}

export default EmployeeLayout