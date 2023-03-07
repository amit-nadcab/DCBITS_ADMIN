import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";

import { sidebar } from '../utils/helperFunctions'
import { logout } from '../redux/reducer'
export const Sidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    sidebar()
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Logout Successfully")
    navigate('/')
  }

  return (
    <>
      <header class="header-1">
        <div class="header_in d-flex justify-content-between">
          <Link className="navbar-brand" to="/home">
            <img src="assets/img/logo_1.png" className="logo" alt="logo" width="172px" height="43px" />
          </Link>
          <button type="button" class="toggle button-1" id="toggle">
            <span></span>
          </button>


        </div>
      </header>

      <div class="sidebar" id='sidebar'>
        <ul className='mt-3'>
          <li><Link to="/home"> <b className='text-primary'> Home </b></Link></li>
          <li><Link to="/dashboard"> <b className='text-primary'> Dashboard </b></Link></li>
          <li><Link to="/hotWallet"> <b className='text-primary'>Hot Wallet</b></Link></li>
          <li><Link to="/coldWallet"> <b className='text-primary'>Cold Wallet</b></Link></li>
          <li><Link to="/activeUsers"><b className='text-primary'>Active Users</b> </Link></li>
          <li><Link to="/inActiveUsers"><b className='text-primary'>Inactive Users</b> </Link></li>
          <li><Link to="/requestWithdraw"><b className='text-primary'>Request Withdraw</b></Link></li>
          <li><Link to="/withdrawHistory"><b className='text-primary'>Withdraw History</b></Link></li>
          <hr style={{ color: "gray" }} />
          <li> <Link className='' to="" onClick={() => handleLogout()}><b className='text-primary'> Logout</b></Link></li>
        </ul>
      </div>
  
    </>
  )
}
