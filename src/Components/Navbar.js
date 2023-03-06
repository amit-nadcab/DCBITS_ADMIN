import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/reducer'
import { toast } from "react-toastify";
import {FiMenu} from 'react-icons/fi'

export const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleLogout = () => {
        dispatch(logout())
        toast.success("Logout Successfully")
        navigate('/')
      }
    const { user_id, isLoggedIn } = useSelector((state) => state.data.value);
    return (
        //  <!-- Main-menu Strat -->
        <div className="mein-menu">
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="assets/img/logo_1.png" className="logo" alt="logo" width="172px" height="43px" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><FiMenu color="black"/></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {
                                isLoggedIn ?
                                    (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link text-primary" to="/dashboard">Dashboard</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link text-primary" to="" onClick={()=> handleLogout()}>Logout</Link>
                                            </li>
                                        </>
                                    )
                                    : (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link text-primary" to="/login">Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link text-primary" to="/signup">SignUp</Link>
                                            </li>
                                        </>
                                    )
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
