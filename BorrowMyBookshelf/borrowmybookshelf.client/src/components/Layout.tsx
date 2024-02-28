import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from './Navbar';
import Sidebar from './Sidebar';

function Layout() {
    return (
        <div>
            <TopNavbar />
            <div className="page-wrapper">
                <div className="outlet-wrapper"><Outlet /></div>
                <Sidebar />
            </div>
        </div>
    );
}
export default Layout;