import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default function TopNavbar() {
    return (
        <nav className="navbar navbar-expand pink-bg navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <img src= "/public/Site_Logo.png" alt="Logo" width="65" height="65" className="d-inline-block align-middle"></img>
                    <Link to="/" className="siteTitle navbar-brand d-inline-block sacramento-regular align-middle fs-2 ms-3">Borrow My Bookshelf</Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/borrowed">Being Borrowed</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}