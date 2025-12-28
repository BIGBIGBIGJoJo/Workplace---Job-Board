import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const EmployeeLayout = () => {
  return (
    <>  
      <EmployeeNavbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default EmployeeLayout