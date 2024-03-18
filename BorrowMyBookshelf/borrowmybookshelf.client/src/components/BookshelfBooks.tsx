import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Bookshelf } from '../models/Bookshelf';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import BookshelfContext from '../context/BookshelfContext';
import ConfirmModal from './ConfirmModal';
import { BooksOnBookshelf } from '../models/BooksOnBookshelf';
import { Genre } from '../models/Genre';
import BookDropDownMenu from './BookDropDownMenu';
import { getAuthorFullName } from '../models/Author';
import SortModal, { SortFunction } from './SortModal';
import FilterModal, { FilterFunction } from './FilterModal';
import { getBorrowableStatus } from '../models/UserBook';

export default function BookshelfBooks() {
    const bookshelfId = useParams<{ bookshelfId: string }>().bookshelfId ?? "";
    const currentUserId = GetCurrentUser()?.userId;
    const maybeFriendIdString = useParams<{ userId?: string }>().userId;
    const userId = maybeFriendIdString ? parseInt(maybeFriendIdString) : currentUserId;
    const isCurrentUser = userId === currentUserId;
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { refreshBookshelf } = useContext(BookshelfContext);
    const navigate = useNavigate();
    const [booksOnBookshelf, setBooksOnBookshelf] = useState<BooksOnBookshelf[] | undefined>();
    const [openDropDown, setDropDown] = useState(-1);
    const [searchFilter, setSearchFilter] = useState<(booksOnBookshelf: BooksOnBookshelf) => boolean>(() => () => true);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortMethod, setSortMethod] = useState<SortFunction>(() => () => 0)
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterMethod, setFilterMethod] = useState<FilterFunction>(() => () => true)


    const fetchBookshelf = async (id: string) => {
        try {
            const response = await axios.get<Bookshelf>(`/api/bookshelves/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setBookshelf(response.data);
            console.log(response.data);
            console.log(new Bookshelf(response.data.bookshelfId, response.data.bookshelfName, response.data.userId));
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    }

    useEffect(() => {
        if (bookshelfId) {
            fetchBookshelf(bookshelfId);
        }
        setDropDown(-1);
    }, [bookshelfId]);

    useEffect(() => {
        populateBooksOnBookshelvesData(bookshelfId);
    }, [bookshelfId]);

    const deleteBookshelf = async (bookshelfId: string) => {
        try {
            await axios.delete(`/api/bookshelves/${bookshelfId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            return true;
        } catch (error) {
            console.error('Error deleting bookshelf:', error);
            return false;
        }
    };

    const handleConfirm = async () => {
        setShowModal(false);
        if (bookshelfId) {
            const isDeleted = await deleteBookshelf(bookshelfId);
            if (isDeleted) {
                await refreshBookshelf(GetCurrentUser()?.userId ?? -1);
                navigate(`/`);
            }
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const confirmDelete = () => {
        setShowModal(true);
    };

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

    const makeBookDropDownFunction = (bookId: number) => {
        return () => {
            if (bookId == openDropDown) {
                return setDropDown(-1);
            }
            setDropDown(bookId);
        }
    }
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

    const refreshShelf = () => populateBooksOnBookshelvesData(bookshelfId);

    const maybeShortenGenresListDisplay = (genres: Genre[]): string => {
        if (genres.length <= 3) {
            return genres.map(genre => genre.genreType).join(", ");
        }
        return genres.slice(0, 3).map(genre => genre.genreType).join(", ") + ", ...";
    }

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        if (!searchValue) {
            return setSearchFilter(() => () => true);
        }
        setSearchFilter(() => (booksOnBookshelf: BooksOnBookshelf) => {
            return booksOnBookshelf.userBook.book.title.toLowerCase().includes(searchValue) ||
                getAuthorFullName(booksOnBookshelf.userBook.book.author).toLowerCase().includes(searchValue) ||
                booksOnBookshelf.userBook.book.genres.some(x => x.genreType.toLowerCase().includes(searchValue)) ||
                getBookFormatString(booksOnBookshelf.userBook.bookFormat).toLowerCase().includes(searchValue);
        })
    }

    const contents = booksOnBookshelf === undefined
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
                {booksOnBookshelf.filter((booksOnBookshelf) => filterMethod(booksOnBookshelf.userBook.book, booksOnBookshelf.userBook)).filter(searchFilter).sort((booksOnBookshelf: BooksOnBookshelf, booksOnBookshelf2: BooksOnBookshelf) => sortMethod(booksOnBookshelf.userBook.book, booksOnBookshelf2.userBook.book)).map(booksOnBookshelf =>
                    <tr key={booksOnBookshelf.bookshelfBookId}>
                        <td>{booksOnBookshelf.userBook.book.title}</td>
                        <td>{getAuthorFullName(booksOnBookshelf.userBook.book.author)}</td>
                        <td>{booksOnBookshelf.userBook.book.pageCount}</td>
                        <td>{booksOnBookshelf.userBook.book.audioLength}</td>
                        <td>{maybeShortenGenresListDisplay(booksOnBookshelf.userBook.book.genres)}</td>
                        <td>{getBorrowableStatus(booksOnBookshelf.userBook)}</td>
                        <td>{getBookFormatString(booksOnBookshelf.userBook.bookFormat)}</td>
                        <td>
                            <button onClick={makeBookDropDownFunction(booksOnBookshelf.userBook.userBookId)} className="btn btn-warning"><img src="/vert_dropdown.png" alt="Details"></img></button>
                            {openDropDown == booksOnBookshelf.userBook.userBookId && (
                                <BookDropDownMenu bookId={booksOnBookshelf.userBook.book.bookId}
                                    userBookId={booksOnBookshelf.userBook.userBookId}
                                    bookshelfBookId={booksOnBookshelf.bookshelfBookId}
                                    refreshShelf={refreshShelf}
                                    hideEditOption={!isCurrentUser}
                                    hideAddToBookshelf={!isCurrentUser}
                                    hideDeleteOption={!isCurrentUser}
                                    userBook={booksOnBookshelf.userBook}
                                    showDropDown={setDropDown}
                                />
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className = "wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{bookshelf?.bookshelfName}</h2>
                    {isCurrentUser && (
                        <div className="nav navbar-nav left-align-btns">
                            <Link to={`/update-bookshelf/${bookshelfId}`}>
                                <button className="btn btn-success nav- ms-3"> <img src="/edit.png" alt="Edit Name" /> </button>
                            </Link>
                            <button onClick={confirmDelete} className="btn btn-success nav-item ms-3"><img src="/delete.png" alt="Delete Bookshelf" /></button>
                        </div>)}
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
                                authors={booksOnBookshelf?.map(booksOnBookshelf => booksOnBookshelf.userBook.book.author) ?? []}
                                genres={booksOnBookshelf?.flatMap(booksOnBookshelf => booksOnBookshelf.userBook.book.genres) ?? []}
                            />
                        )}
                        <button onClick={onClickSort} className="btn btn-success nav-item ms-3"> <img src="/sort.png" alt="Sort" /> </button>
                        </div>
                </div>
            </nav>
            {showSortModal && (
                <SortModal
                    message="What would you like to sort?"
                    onConfirm={handleConfirmSort}
                    onCancel={handleCancelSort}
                    setSort={setSortMethod}
                />
            )}
            <main className="bookshelf-main">
                {contents}
            </main>
            <footer className="footer teal-bg text-light">
                <Link to={`/add-book/${bookshelfId}`}>
                    <button className="btn btn-warning mr-3">Add Book</button>
                </Link>
            </footer>
            {showModal && (
                <ConfirmModal
                    message="Are you sure you want to delete this bookshelf?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
    async function populateBooksOnBookshelvesData(bookshelfId: string) {
        const response: AxiosResponse<BooksOnBookshelf[]> = await axios.get(`/api/bookshelfBooks/bookshelf/${bookshelfId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setBooksOnBookshelf(response.data);
    }
}