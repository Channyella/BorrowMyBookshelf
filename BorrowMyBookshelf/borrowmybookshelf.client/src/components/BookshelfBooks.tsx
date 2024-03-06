import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Bookshelf } from '../models/Bookshelf';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import BookshelfContext from '../context/BookshelfContext';
import ConfirmModal from './ConfirmModal';
import { BooksOnBookshelf } from '../models/BooksOnBookshelf';
import { Genre } from '../models/Genre';

export default function BookshelfBooks() {
    const bookshelfId = useParams<{ bookshelfId: string }>().bookshelfId ?? "";
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { refreshBookshelf } = useContext(BookshelfContext);
    const navigate = useNavigate();
    const [booksOnBookshelf, setBooksOnBookshelf] = useState<BooksOnBookshelf[] | undefined>();

    const fetchBookshelf = async (id: string) => {
        try {
            const response = await axios.get<Bookshelf>(`/api/bookshelves/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setBookshelf(response.data);
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    }

    useEffect(() => {
        if (bookshelfId) {
            fetchBookshelf(bookshelfId);
        }
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
        return genres.slice(0, 3).map(genre => genre.genreType).join(", ") + ", ...";
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
                {booksOnBookshelf.map(booksOnBookshelf =>
                    <tr key={booksOnBookshelf.bookshelfBookId}>
                        <td>{booksOnBookshelf.userBook.book.title}</td>
                        <td>{`${booksOnBookshelf.userBook.book.author.firstName} ${booksOnBookshelf.userBook.book.author.middleName ?? ""} ${booksOnBookshelf.userBook.book.author.lastName}`}</td>
                        <td>{booksOnBookshelf.userBook.book.pageCount}</td>
                        <td>{booksOnBookshelf.userBook.book.audioLength}</td>
                        <td>{maybeShortenGenresListDisplay(booksOnBookshelf.userBook.book.genres)}</td>
                        <td>{booksOnBookshelf.userBook.borrowable ? "Yes" : "No"}</td>
                        <td>{getBookFormatString(booksOnBookshelf.userBook.bookFormat)}</td>
                        <td>
                            <button className="btn btn-success"><img src="/vert_dropdown.png" alt="Details"></img></button>
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
                    <div className="nav navbar-nav navbar-left">
                        <Link to={`/update-bookshelf/${bookshelfId}`}>
                            <button className="btn btn-success nav- ms-3"> <img src="/edit.png" alt="Edit Name" /> </button>
                        </Link>
                        <button onClick={confirmDelete} className="btn btn-success nav-item ms-3"><img src="/delete.png" alt="Delete Bookshelf" /></button>
                    </div>
                        <div className="nav navbar-nav navbar-right">
                            <input className="nav-item custom-input"
                                type="text"
                                placeholder="Search"
                            />
                            <button className="btn btn-success nav-item ms-3"> <img src="/filter.png" alt="Filter" /> </button>
                            <button className="btn btn-success nav-item ms-3"> <img src="/sort.png" alt="Sort" /> </button>
                        </div>
                </div>
            </nav>
            <main className="bookshelf-main">
                {contents}
            </main>
            <footer className="footer teal-bg text-light">
                <Link to={`/add-book/${bookshelfId}`}>
                    <button className="btn btn-success mr-3">Add Book</button>
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