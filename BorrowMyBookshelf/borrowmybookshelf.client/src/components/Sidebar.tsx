import React, { useContext, useEffect, useState} from 'react';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import { GetAuthHeader, GetCurrentUser, UserInfo } from '../helpers/AuthHelper';
import BookshelfContext from '../context/BookshelfContext';
import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';

export default function Sidebar() {
    const { userId } = useParams<{ userId?: string }>();
    const { bookshelves } = useContext(BookshelfContext);
    const userInfo = GetCurrentUser();
    const [user, setUser] = useState<User | null | UserInfo>(null);
    const linkPrefix = userId ? `/friends/friend-profile/${userId}` : '';
    const isCurrentUser = userInfo?.userId === user?.userId;

    const userFirstName = user?.firstName;
    async function populateUserData(userId: number) {
        const response: AxiosResponse<User> = await axios.get(`/api/users/${userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUser(response.data);
    }

    useEffect(() => {
        if (userId) {
            populateUserData(parseInt(userId));
        }
        else {
            setUser(userInfo);
        }
    }, [userId]);

    const contents = bookshelves === undefined
        ? <p>Boo.</p>
        : (
            <ul className="bookshelvesList" aria-labelledby="sideNavLabel">
                <li className="bullet-style">
                    <Link className="sidebar-link" to={`${linkPrefix}/all-user-books`}> All {user?.firstName ?? ""}&apos;s Books </Link>
                </li>
                {bookshelves?.map(bookshelf =>
                    <li key={bookshelf.bookshelfId} className="bullet-style">
                        <Link className="sidebar-link" to={`${linkPrefix}/bookshelf-books/${bookshelf.bookshelfId}`}> {bookshelf.bookshelfName} </Link>
                    </li>
                )}
            </ul>);

    return (
        <div className="sidebar green-bg">
            <h2 className="row justify-content-center text-center mt-3"> {userFirstName}&apos;s Bookshelves</h2>
                {contents}
            <div className="text-center">
                {isCurrentUser && (
                    <Link to="/add-bookshelf">
                        <button className="btn btn-success" >Add Bookshelf</button>
                    </Link>)}
            </div>
        </div>
    );

  }
