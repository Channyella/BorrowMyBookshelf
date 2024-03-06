import React, { useContext } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { deleteCookie } from '../helpers/AuthHelper';
import AuthContext from '../context/AuthProvider';

export default function TopNavbar() {

    const { setAuth } = useContext(AuthContext);

    const deleteCookieOnClick = () => {
        try {
            deleteCookie();
            console.log('Cookie deleted successfully');
            setAuth(null);
        } catch (error: unknown) {
            console.error('Error deleting cookie:', (error as Error).message);
        }
    };
    return (
        <nav className="navbar navbar-expand pink-bg navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <img src= "/public/Site_Logo.png" alt="Logo" width="65" height="65" className="d-inline-block align-middle"></img>
                    <Link to="/" className="siteTitle navbar-brand d-inline-block sacramento-regular align-middle fs-2 ms-3">Borrow My Bookshelf</Link>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item">
                        <Link className="nav-link" to="/"><img src="./public/home.png" alt="Home" /> Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile"><img src="./public/account.png" alt="Profile" /> Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/friends"><img src="./public/friends.png" alt="Friends" /> Friends</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/borrowed"><img src="./public/being_borrowed.png" alt="Being Borrowed" /> Being Borrowed</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/all-books"><img src="./public/open_book.png" alt="All Books" /> All Books</Link>
                    </li>
                    <li className="nav-item ms-2">
                        <button className="btn btn-success" onClick={deleteCookieOnClick}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}