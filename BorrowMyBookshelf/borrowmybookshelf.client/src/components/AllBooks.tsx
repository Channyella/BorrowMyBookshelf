import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import { Book } from '../models/Book';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader } from '../helpers/AuthHelper';
import BookDropDownMenu from './BookDropDownMenu';
import { getAuthorFullName } from '../models/Author';

export default function Home() {
    const [books, setBooks] = useState<Book[] | undefined>();
    const [searchFilter, setSearchFilter] = useState<(book: Book) => boolean>(() => () => true);
    const [openDropDown, setDropDown] = useState(-1);
    useEffect(() => {
        populateBookData();
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

    const contents = books === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Page Count</th>
                    <th>Description</th>
                    <th>Audio Length</th>
                    <th>Genres</th>
                </tr>
            </thead>
            <tbody>
                {books.filter(searchFilter).map(book =>
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{`${book.author.firstName} ${book.author.middleName ?? ""} ${book.author.lastName}`}</td>
                        <td>{book.pageCount}</td>
                        <td>{book.description}</td>
                        <td>{book.audioLength}</td>
                        <td>{book.genres.map(genre => genre.genreType).join(", ")}</td>
                        <td> <button onClick={makeBookDropDownFunction(book.bookId)} className="btn btn-warning"><img src="/vert_dropdown.png" alt="Details"></img></button> 
                            {openDropDown == book.bookId && (
                                <BookDropDownMenu bookId={book.bookId}
                                    hideDeleteOption={true}
                                    refreshShelf={refreshShelf}
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
                        <button className="btn btn-success nav-item ms-3"> <img src="/filter.png" alt="Filter" /> </button>
                        <button className="btn btn-success nav-item ms-3"> <img src="/sort.png" alt="Sort" /></button>
                    </div>
                </div>
            </nav>
            {contents}
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