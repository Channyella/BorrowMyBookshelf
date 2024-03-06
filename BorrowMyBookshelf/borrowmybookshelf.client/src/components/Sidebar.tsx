import React, { useContext} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { GetCurrentUser } from '../helpers/AuthHelper';
import BookshelfContext from '../context/BookshelfContext';

export default function Sidebar() {
    const { bookshelves } = useContext(BookshelfContext);
    const userInfo = GetCurrentUser();
    const userFirstName = userInfo?.firstName;

    const contents = bookshelves === undefined
        ? <p>Boo.</p>
        : (
            <ul className="bookshelvesList" aria-labelledby="sideNavLabel">
                <li>
                    <Link className="sidebar-link" to={`/all-user-books`}> All {GetCurrentUser()?.firstName ?? ""}'s Books </Link>
                </li>
                {bookshelves?.map(bookshelf =>
                    <li key={bookshelf.bookshelfId}>
                        <Link className="sidebar-link" to={`/bookshelf-books/${bookshelf.bookshelfId}`}> {bookshelf.bookshelfName} </Link>
                    </li>
                )}
            </ul>);

    return (
        <div className="sidebar green-bg">
            <h2 className="row justify-content-center text-center mt-3"> {userFirstName}'s Bookshelves</h2>
                {contents}
            <div className="text-center">
                <Link to="/add-bookshelf">
                    <button className="btn btn-success" >Add Bookshelf</button>
                </Link>
            </div>
        </div>
    );

  }
