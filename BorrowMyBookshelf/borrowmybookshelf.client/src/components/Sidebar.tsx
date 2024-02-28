import React from 'react';
import './style.css';

export default function Sidebar() {
    return (
        <div className="sidebar green-bg">
            <h2 className= "row justify-content-center mt-3">Bookshelves</h2>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            <div className="text-center">
                <button className="btn btn-success" >Add Bookshelf</button>
            </div>
        </div>
    );
  }
