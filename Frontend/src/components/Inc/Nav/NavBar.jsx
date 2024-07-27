import React from 'react'
import { Link } from 'react-router-dom'
import "./nav.css"
const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light shadow  ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">PostApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                            <Link to='/' className='nav-link'> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/login' className='nav-link'> Login </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/register' className='nav-link'>Register</Link>
                            </li>
                            <li className="nav-item">
                            <Link to='/profile' className='nav-link'>Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar