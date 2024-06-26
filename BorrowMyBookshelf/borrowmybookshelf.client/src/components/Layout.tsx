import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from './Navbar';
import { BookshelfProvider } from '../context/BookshelfContext';

function Layout() {
    return (
        <div>
            <TopNavbar />
            <BookshelfProvider>
                <div className="page-wrapper">
                    <div className="outlet-wrapper"><Outlet /></div>
                </div>
            </BookshelfProvider>
        </div>
    );
}
export default Layout;