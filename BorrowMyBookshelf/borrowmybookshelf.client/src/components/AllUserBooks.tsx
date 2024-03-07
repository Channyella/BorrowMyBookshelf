import './style.css';
import React, { useEffect, useState, } from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { UserBook } from '../models/UserBook';
import { Genre } from '../models/Genre';
import { Link } from 'react-router-dom';
import BookDropDownMenu from './BookDropDownMenu';
import { getAuthorFullName } from '../models/Author';
import SortModal, { SortFunction } from './SortModal';

export default function Home() {
    const [userBooks, setUserBooks] = useState<UserBook[] | undefined>();
    const [searchFilter, setSearchFilter] = useState<(userBook: UserBook) => boolean>(() => () => true);
    const userId = GetCurrentUser()?.userId;
    const [openDropDown, setDropDown] = useState(-1);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortMethod, setSortMethod] = useState<SortFunction>(() => () => 0)

    useEffect(() => {
        populateUserBookData();
    }, []);

    enum BookFormat {
        Hardcover = 1,
        Paperback = 2,
        eBook = 3,
        AudioBook = 4
    }

    const getBookFormatString = (format: BookFormat): string => {
        switch (format) {
            case BookFormat.Hardcover:
                return "Hardcover";
            case BookFormat.Paperback:
                return "Paperback";
            case BookFormat.eBook:
                return "eBook";
            case BookFormat.AudioBook:
                return "Audio Book";
            default:
                return "Unknown";
        }
    }

    const maybeShortenGenresListDisplay = (genres: Genre[]): string => {
        if (genres.length <= 3) {
            return genres.map(genre => genre.genreType).join(", ");
        }
        return genres.slice(0,3).map(genre => genre.genreType).join(", ") + ", ...";
    }

    const makeBookDropDownFunction = (bookId: number) => {
        return () => {
            if (bookId == openDropDown) {
                return setDropDown(-1);
            }
            setDropDown(bookId);
        }
    }

    const handleCancelSort = () => {
        setShowSortModal(false);
    };

    const handleConfirmSort = () => {
        setShowSortModal(false);
    };

    const onClickSort = () => {
        setShowSortModal(true);
    };
    const refreshShelf = () => populateUserBookData();

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        if (!searchValue) {
            return setSearchFilter(() => () => true);
        }
        setSearchFilter(() => (userBook: UserBook) => {
            return userBook.book.title.toLowerCase().includes(searchValue) ||
                getAuthorFullName(userBook.book.author).toLowerCase().includes(searchValue) ||
                userBook.book.genres.some(x => x.genreType.toLowerCase().includes(searchValue)) ||
                getBookFormatString(userBook.bookFormat).toLowerCase().includes(searchValue);
        })
    }

    const contents = userBooks === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Page Count</th>
                    <th>Audio Length</th>
                    <th>Genres</th>
                    <th>Borrowable</th>
                    <th>Book Format</th>
                </tr>
            </thead>
            <tbody>
                {userBooks.filter(searchFilter).sort((userBook: UserBook, userBook2: UserBook) => sortMethod(userBook.book, userBook2.book)).map(userBook =>
                    <tr key={userBook.userBookId}>
                        <td>{userBook.book.title}</td>
                        <td>{getAuthorFullName(userBook.book.author)}</td>
                        <td>{userBook.book.pageCount}</td>
                        <td>{userBook.book.audioLength}</td>
                        <td>{maybeShortenGenresListDisplay(userBook.book.genres)}</td>
                        <td>{userBook.borrowable ? "Yes" : "No"}</td>
                        <td>{getBookFormatString(userBook.bookFormat)}</td>
                        <td>
                            <button onClick={makeBookDropDownFunction(userBook.userBookId)} className="btn btn-warning"><img src="/vert_dropdown.png" alt="Details"></img></button>
                            {openDropDown == userBook.userBookId && (
                                <BookDropDownMenu bookId={userBook.book.bookId}
                                    userBookId={userBook.userBookId}
                                    hideDeleteOption={true}
                                    showUserBooksDeleteOption={true}
                                    refreshShelf={ refreshShelf }
                                />
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">All {GetCurrentUser()?.firstName ?? ""}&apos;s Books</h2>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"
                            onChange={search}
                        />
                        <button className="btn btn-success nav-item ms-3"> <img src="/filter.png" alt="Filter"/> </button>
                        <button onClick={onClickSort} className="btn btn-success nav-item ms-3"> <img src="/sort.png" alt="Sort" /></button>
                    </div>
                </div>
            </nav>
            {contents}
            {showSortModal && (
                <SortModal
                    message="What would you like to sort?"
                    onConfirm={handleConfirmSort}
                    onCancel={handleCancelSort}
                    setSort={ setSortMethod }
                />
            )}
        </div>
    );
    async function populateUserBookData() {
        const response: AxiosResponse<UserBook[]> = await axios.get(`api/userBooks/user-id/${userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUserBooks(response.data);
    }
}