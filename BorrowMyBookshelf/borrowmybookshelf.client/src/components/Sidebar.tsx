import React, { useEffect, useState } from 'react';
import './style.css';
import { Bookshelf } from '../models/Bookshelf';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [bookshelves, setBookshelves] = useState<Bookshelf[] | undefined>();
    useEffect(() => {
        populateBookshelfData();
    }, []);

    const contents = bookshelves === undefined
        ? <p>Boo.</p>
        : (
            <ul className="bookshelvesList" aria-labelledby="sideNavLabel">
                {bookshelves.map(bookshelf =>
                    <li key={bookshelf.bookshelfId}>
                        <Link to={`/bookshelf-books/${bookshelf.bookshelfId}`}> {bookshelf.bookshelfName} </Link>
                    </li>
                )}
            </ul>);

    return (
        <div className="sidebar green-bg">
            <h2 className= "row justify-content-center mt-3">Bookshelves</h2>
                {contents}
            <div className="text-center">
                <button className="btn btn-success" >Add Bookshelf</button>
            </div>
        </div>
    );
    async function populateBookshelfData() {
        const response = await fetch('api/bookshelves');
        const data: Bookshelf[] = await response.json();
        setBookshelves(data);
    }
  }
