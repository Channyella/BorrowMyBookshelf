import React, { useContext } from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import { Book } from '../models/Book';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import BookDropDownMenu from './BookDropDownMenu';
import { getAuthorFullName } from '../models/Author';
import SortModal, { SortFunction } from './SortModal';
import FilterModal, { FilterFunction } from './FilterModal';
import BookshelfContext from '../context/BookshelfContext';

export default function Home() {
    const [books, setBooks] = useState<Book[] | undefined>();
    const [searchFilter, setSearchFilter] = useState<(book: Book) => boolean>(() => () => true);
    const [openDropDown, setDropDown] = useState(-1);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortMethod, setSortMethod] = useState<SortFunction>(() => () => 0)
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterMethod, setFilterMethod] = useState<FilterFunction>(() => () => true)
    const useBookshelfContext = useContext(BookshelfContext);
    const userId = GetCurrentUser()?.userId;
    const [filterApplied, setFilterApplied] = useState(false);
    const [sortApplied, setSortApplied] = useState(false);

    useEffect(() => {
        populateBookData();
        useBookshelfContext.refreshBookshelf(userId ?? -1);
    }, []);

    const makeBookDropDownFunction = (bookId: number) => {
        return () => {
            if (bookId == openDropDown) {
                return setDropDown(-1);
            }
            setDropDown(bookId);
        }
    }
    const refreshShelf = () => populateBookData();

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        if (!searchValue) {
            return setSearchFilter(() => () => true);
        }
        setSearchFilter(() => (book: Book) => {
            return book.title.toLowerCase().includes(searchValue) ||
                getAuthorFullName(book.author).toLowerCase().includes(searchValue) ||
                book.genres.some(x => x.genreType.toLowerCase().includes(searchValue));
        })
    }

    const formatAudioLength = (audioLength?: number): string => {
        if (!audioLength) return "";
        const hours = Math.floor(audioLength / 60);
        const minutes = audioLength % 60;
        return `${hours}h ${minutes}m`;
    }

    // Sort Modal Functions
    const handleCancelSort = () => {
        setShowSortModal(false);
        setSortApplied(false);
    };

    const handleConfirmSort = () => {
        setShowSortModal(false);
        setSortApplied(true);
    };

    const onClickSort = () => {
        setShowSortModal(true);
    };

    // Filter Modal Functions
    const handleCancelFilter = () => {
        setShowFilterModal(false);
        setFilterApplied(false);
    };

    const handleConfirmFilter = () => {
        setShowFilterModal(false);
        setFilterApplied(true);
    };

    const onClickFilter = () => {
        setShowFilterModal(true);
    };

    const contents = books === undefined
        ? <p><em>Loading... </em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Page Count</th>
                    <th>Audio Length</th>
                    <th>Genres</th>
                </tr>
            </thead>
            <tbody>
                {books.filter((book) => filterMethod(book)).filter(searchFilter).sort((book: Book, book2: Book) => sortMethod(book, book2)).map(book =>
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{`${book.author.firstName} ${book.author.middleName ?? ""} ${book.author.lastName}`}</td>
                        <td>{`${book.pageCount} pages`}</td>
                        <td>{formatAudioLength(book.audioLength)}</td>
                        <td>{book.genres.map(genre => genre.genreType).join(", ")}</td>
                        <td> <button onClick={makeBookDropDownFunction(book.bookId)} className="btn btn-warning move-btn-left"><img src="/vert_dropdown.png" alt="Details"></img></button> 
                            {openDropDown == book.bookId && (
                                <BookDropDownMenu bookId={book.bookId}
                                    hideDeleteOption={true}
                                    refreshShelf={refreshShelf}
                                    hideEditOption={true}
                                    onlyBookId={true}
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
                    <h2 className="navbar-header ms-3">All Books</h2>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"
                            onChange={search}
                        />
                        <button onClick={onClickFilter} className={`btn btn-success nav-item ms-3 ${filterApplied ? 'active' : ''}`}>
                            <img src="/filter.png" alt="Filter" />
                            {filterApplied && <span className="filter-indicator"> Filter Active</span>}
                        </button>
                            <FilterModal
                            message="Select what you'd like to filter:"
                            onConfirm={handleConfirmFilter}
                            onCancel={handleCancelFilter}
                            setFilter={setFilterMethod}
                            authors={books?.map(book => book.author) ?? []}
                            genres={books?.flatMap(book => book.genres) ?? []}
                            hideOnAllBooks={true}
                            showModal={showFilterModal }
                            />

                        <button onClick={onClickSort} className={`btn btn-success nav-item ms-3 ${sortApplied ? 'active' : ''}`}>
                            <img src="/sort.png" alt="Sort" />
                            {sortApplied && <span className="sort-indicator"> Sort Active</span>}
                        </button>
                    </div>
                </div>
            </nav>
            {contents}
                <SortModal
                message="What would you like to sort?"
                onConfirm={handleConfirmSort}
                onCancel={handleCancelSort}
                setSort={setSortMethod}
                showModal={showSortModal}
                />
        </div>
    );
    async function populateBookData() {
        const response: AxiosResponse<Book[]> = await axios.get('api/books/detailed', {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setBooks(response.data);
    }
}