import './style.css';
import React, { useContext, useEffect, useState, } from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser, UserInfo } from '../helpers/AuthHelper';
import { UserBook, getBorrowableStatus } from '../models/UserBook';
import { Genre } from '../models/Genre';
import { Link, useParams } from 'react-router-dom';
import BookDropDownMenu from './BookDropDownMenu';
import { getAuthorFullName } from '../models/Author';
import SortModal, { SortFunction } from './SortModal';
import FilterModal, { FilterFunction } from './FilterModal';
import BookshelfContext from '../context/BookshelfContext';
import { User } from '../models/User';

export default function Home() {
    const [userBooks, setUserBooks] = useState<UserBook[] | undefined>();
    const [searchFilter, setSearchFilter] = useState<(userBook: UserBook) => boolean>(() => () => true);
    const params = useParams<{ userId?: string }>();
    const maybeFriendUserId = params.userId ? parseInt(params.userId) : undefined;
    const userId = maybeFriendUserId ?? GetCurrentUser()?.userId;
    const [openDropDown, setDropDown] = useState(-1);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortMethod, setSortMethod] = useState<SortFunction>(() => () => 0)
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterMethod, setFilterMethod] = useState<FilterFunction>(() => () => true)
    const useBookshelfContext = useContext(BookshelfContext);
    const [user, setUser] = useState<User | null | UserInfo>(null);
    const isCurrentUser = userId === GetCurrentUser()?.userId;


    useEffect(() => {
        populateUserBookData(userId ?? -1);
        useBookshelfContext.refreshBookshelf(userId ?? -1);
    }, []);

    async function populateUserData(userId: number) {
        const response: AxiosResponse<User> = await axios.get(`/api/users/${userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUser(response.data);
    }

    useEffect(() => {
        if (maybeFriendUserId) {
            populateUserData(maybeFriendUserId);
        }
        else {
            setUser(GetCurrentUser);
        }
    }, [maybeFriendUserId]);


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

    // Sort Modal Functions
    const handleCancelSort = () => {
        setShowSortModal(false);
    };

    const handleConfirmSort = () => {
        setShowSortModal(false);
    };

    const onClickSort = () => {
        setShowSortModal(true);
    };

    // Filter Modal Functions
    const handleCancelFilter = () => {
        setShowFilterModal(false);
    };

    const handleConfirmFilter = () => {
        setShowFilterModal(false);
    };

    const onClickFilter = () => {
        setShowFilterModal(true);
    };

    const refreshShelf = () => populateUserBookData(userId ?? -1);

    // Search Function 
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
                {userBooks.filter((userBook) => filterMethod(userBook.book, userBook)).filter(searchFilter).sort((userBook: UserBook, userBook2: UserBook) => sortMethod(userBook.book, userBook2.book)).map(userBook =>
                    <tr key={userBook.userBookId}>
                        <td>{userBook.book.title}</td>
                        <td>{getAuthorFullName(userBook.book.author)}</td>
                        <td>{userBook.book.pageCount}</td>
                        <td>{userBook.book.audioLength}</td>
                        <td>{maybeShortenGenresListDisplay(userBook.book.genres)}</td>
                        <td>{getBorrowableStatus(userBook)}</td>
                        <td>{getBookFormatString(userBook.bookFormat)}</td>
                        <td>
                            <button onClick={makeBookDropDownFunction(userBook.userBookId)} className="btn btn-warning"><img src="/vert_dropdown.png" alt="Details"></img></button>
                            {openDropDown == userBook.userBookId && (
                                <BookDropDownMenu bookId={userBook.book.bookId}
                                    userBookId={userBook.userBookId}
                                    hideDeleteOption={true}
                                    showUserBooksDeleteOption={isCurrentUser}
                                    refreshShelf={refreshShelf}
                                    hideEditOption={!isCurrentUser}
                                    hideAddToBookshelf={!isCurrentUser}
                                    userBook={userBook}
                                    showDropDown={setDropDown}
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
                    <h2 className="navbar-header ms-3">All {user?.firstName ?? ""}&apos;s Books</h2>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"
                            onChange={search}
                        />
                        <button onClick={onClickFilter} className="btn btn-success nav-item ms-3"> <img src="/filter.png" alt="Filter" /> </button>
                        {showFilterModal && (
                            <FilterModal
                                message="Select what you'd like to filter:"
                                onConfirm={handleConfirmFilter}
                                onCancel={handleCancelFilter}
                                setFilter={setFilterMethod}
                                authors={userBooks?.map(userBook => userBook.book.author) ?? []}
                                genres={userBooks?.flatMap(userBook => userBook.book.genres) ?? [] }
                                />
                        ) }
                        <button onClick={ onClickSort } className="btn btn-success nav-item ms-3"> <img src="/sort.png" alt="Sort" /></button>
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
    async function populateUserBookData(userId: number) {
        const response: AxiosResponse<UserBook[]> = await axios.get(`/api/userBooks/user-id/${userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUserBooks(response.data);
    }
}