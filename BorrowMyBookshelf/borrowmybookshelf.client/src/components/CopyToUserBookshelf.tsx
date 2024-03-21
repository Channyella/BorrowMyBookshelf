import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Bookshelf } from '../models/Bookshelf';
import { Book } from '../models/Book';
import { BookFormat } from '../models/UserBook';
import { getAuthorFullName } from '../models/Author';
import { AddBookToBookshelf } from '../helpers/BookHelper';

export default function CopyToUserBookshelf() {
    const { bookId } = useParams<{ bookId: string }>() ?? "";
    const [title, setTitle] = useState<string>('');
    const [name, setName] = useState<string>('');
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();
    const [bookshelves, setBookshelves] = useState<Bookshelf[] | undefined>();
    const [selectedBookshelf, setSelectedBookshelf] = useState('');
    const [borrowable, setBorrowable] = useState<boolean>(false);
    const [format, setFormat] = useState<BookFormat>(BookFormat.Hardcover);

    const handleBorrowableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBorrowable(event.target.value === 'true');
    };

    const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormat(event.target.value as unknown as BookFormat);
    };

    // fetch selected book
    const fetchBook = async (id: string) => {
        try {
            const response = await axios.get<Book>(`/api/books/${id}/detailed`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            const detailedBook = new Book(response.data);
            setTitle(detailedBook.title);
            setName(getAuthorFullName(detailedBook.author));
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    }

    useEffect(() => {
        if (bookId) {
            fetchBook(bookId);
        }
    }, [bookId]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    // fetch bookshelves
    useEffect(() => {
        const fetchBookshelves = async () => {
            try {
                const response = await axios.get(`/api/bookshelves/user-id/${userId}`, {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
                setBookshelves(response.data);
            } catch (error) {
                console.error('Error fetching user bookshelves:', error);
            }
        };
        fetchBookshelves();
    }, []);

    const handleBookshelfChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBookshelf(event.target.value);
    }

    // Function for adding book to bookshelf and turning book into userBook
    const copyBookToBookshelf = async () => {
        if (!bookId || !selectedBookshelf || !format) return;
        await AddBookToBookshelf({ bookId: parseInt(bookId), bookshelfId: parseInt(selectedBookshelf), bookFormat: format, borrowable, title, userId, genreTypes: [] })
        navigate(`/bookshelf-books/${selectedBookshelf}`);
    }
    async function goBack() {
        navigate(-1);
    }

    return (
        <div className="create-book outlet-content template yellow-bg ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <button onClick={goBack} className="btn btn-success mt-3 ms-3"> <img src="/back_arrow.png" alt="Go Back" /> </button>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-12 ">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className='form-container-forms p-5 rounded bg-white'>
                <form id="new-book">
                    <h3 className="text-center">Add to Your Bookshelf:</h3>
                    <label htmlFor="bookshelves">Select Bookshelf:</label>
                        <select id="bookshelves" className="form-select w-50" value={selectedBookshelf} onChange={handleBookshelfChange}>
                            <option value="">Select</option>
                            {bookshelves?.map(bookshelf => (
                                <option key={bookshelf.bookshelfId} value={bookshelf.bookshelfId}> {bookshelf.bookshelfName} </option>
                            ))}
                    </select>

                    <div className='mb-2'>
                        <label htmlFor="title">Title</label>
                        <input type="text"
                            value={title}
                            placeholder="Enter Title"
                            className='form-control'
                            name="title"
                            onChange={handleTitleChange}
                            readOnly
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="firstName">Author&apos;s Name</label>
                        <input type="text"
                            value={name}
                            placeholder="Enter First Name"
                            className='form-control'
                            name="first_name"
                            onChange={handleNameChange}
                            readOnly
                        />
                    </div>

                        <div className="radio-button-container">
                            <input type="radio"
                                id="hardcover"
                                name="format"
                                value={BookFormat.Hardcover}
                                onChange={handleFormatChange} />
                            <label htmlFor="hardcover">Hardcover</label>
                            <input type="radio"
                                id="paperback"
                                name="format"
                                value={BookFormat.Paperback}
                                onChange={handleFormatChange} />
                            <label htmlFor="paperback">Paperback</label>
                            <input type="radio"
                                id="eBook"
                                name="format"
                                value={BookFormat.eBook}
                                onChange={handleFormatChange} />
                            <label htmlFor="eBook">eBook</label>
                            <input type="radio"
                                id="audioBook"
                                name="format"
                                value={BookFormat.AudioBook}
                                onChange={handleFormatChange} />
                            <label htmlFor="audioBook">Audio Book</label>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="borrowable">Borrowable?</label>
                            <select id="borrowable"
                                className='form-control form-select'
                                name="borrowable"
                                value={borrowable ? 'true' : 'false'}
                                onChange={handleBorrowableChange}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                </form>
                <div className='d-grid'>
                    <button onClick={ copyBookToBookshelf } className='btn btn-primary' >Add Book To Bookshelf</button>
                </div>
            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}