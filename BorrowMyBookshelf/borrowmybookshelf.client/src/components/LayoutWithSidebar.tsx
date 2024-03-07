import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { BookshelfProvider } from '../context/BookshelfContext';

function LayoutWithSidebar() {
    return (
        <div>
            <BookshelfProvider>
                <div className="page-wrapper">
                    <div className="outlet-wrapper"><Outlet /></div>
                    <Sidebar />
                </div>
            </BookshelfProvider>
        </div>
    );
}
export default LayoutWithSidebar;