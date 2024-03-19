import React, { useEffect, useState } from 'react';
import './style.css';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { User } from '../models/User';
import { UserBook } from '../models/UserBook';
import BookDropDownMenu from './BookDropDownMenu';
import { Link } from 'react-router-dom';

interface BorrowedProps {
    isBorrowing: boolean;
}
export default function Borrowed({ isBorrowing }: BorrowedProps) {
    const [userBooks, setUserBooks] = useState<UserBook[] | undefined>();
    const [openDropDown, setDropDown] = useState(-1);
    const currentUser = GetCurrentUser();
    const [allUsers, setAllUsers] = useState<Map<number, User>>(new Map());
    const [searchFilter, setSearchFilter] = useState<(userBook: UserBook) => boolean>(() => () => true);


    useEffect(() => {
        refreshPage();
    }, [isBorrowing]);

    const makeBookDropDownFunction = (bookId: number) => {
        return () => {
            if (bookId == openDropDown) {
                return setDropDown(-1);
            }
            setDropDown(bookId);
        }
    }

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        if (!searchValue) {
            return setSearchFilter(() => () => true);
        }
        setSearchFilter(() => (userBook: UserBook) => {
            return userBook.book.title.toLowerCase().includes(searchValue) ||
                allUsers.get(userBook.userId)?.getFullName().toLowerCase().includes(searchValue) ||
                userBook.bookRequest?.borrowerUser.getFullName().toLowerCase().includes(searchValue) ||
                userBook.bookRequest?.requestDate.toLocaleDateString().toLocaleLowerCase().includes(searchValue) ||
            userBook.getBorrowableStatus().toLowerCase().includes(searchValue);
            })
    }

    const refreshPage = () => Promise.all([populateUserBooksData(), getAllUserInfo()]);

    const contents = userBooks === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Owner</th>
                    <th>Borrower</th>
                    <th>Request Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {userBooks.filter((userBook) => searchFilter(userBook)).map(userBook =>
                    <tr key={userBook.bookRequest?.bookRequestId}>
                        <td> {userBook.book.title}</td>
                        <td> {allUsers.get(userBook.userId)?.getFullName()}</td>
                        <td> {userBook.bookRequest?.borrowerUser.getFullName() ?? ""}</td>
                        <td> {userBook.bookRequest?.requestDate ? userBook.bookRequest?.requestDate.toLocaleDateString() : 'No request date found.'} </td>
                        <td> {userBook.getBorrowableStatus()} </td>
                        <td>
                            <button onClick={makeBookDropDownFunction(userBook.userBookId)} className="btn btn-warning"><img src="/vert_dropdown.png" alt="Details"></img></button>
                            {openDropDown === userBook.userBookId && (
                                <BookDropDownMenu bookId={userBook.book.bookId}
                                    userBookId={userBook.userBookId}
                                    refreshShelf={refreshPage}
                                    hideEditOption={true}
                                    hideAddToBookshelf={true}
                                    hideDeleteOption={true}
                                    userBook={userBook}
                                    showDropDown={setDropDown}
                                />
                            )} </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{`What ${currentUser?.firstName} is ${isBorrowing ? "Borrowing" : "Lending"}`}</h2>
                    <div className="nav navbar-nav left-align-btns">
                        <Link to={`/${!isBorrowing ? "borrowed" : "lending"}`}>
                            <button className="btn btn-success nav- ms-3"> <img src="/closed_book.png" alt="Lending" /> Books I&apos;m {!isBorrowing ? "Borrowing" : "Lending"} </button>
                        </Link>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"
                            onChange={ search }
                        />
                    </div>
                </div>
            </nav>
            {contents}
        </div>
    );

    // Grabs userBooks that have a book request connected to it by the userBookId
    async function populateUserBooksData() {
        const url = isBorrowing ? `/api/userBooks/borrowing/user-id/${currentUser?.userId}` : `/api/userBooks/user-id/${currentUser?.userId}`;
        const response: AxiosResponse<UserBook[]> = await axios.get(url, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        const filterFunction = (userBook: UserBook) => !!userBook.bookRequest; 
        const userBooks = response.data.filter(filterFunction).map(userBook => new UserBook(userBook));
        setUserBooks(userBooks);
        return userBooks;
    }

    async function getAllUserInfo() {
        const response: AxiosResponse<User[]> = await axios.get(`/api/users`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        const users = response.data.map(user => new User(user));
        const userMap = new Map<number, User>();
        users.map(user => userMap.set(user.userId, user));
        setAllUsers(userMap);
        return userMap;
    }
}