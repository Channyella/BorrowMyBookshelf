import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { useNavigate } from 'react-router-dom';
import { Post } from '../helpers/NetworkHelper';
import { Book } from '../models/Book';

export default function AddFavBook() {
    const [books, setBooks] = useState<Book[] | undefined>();
    const [selectedBook, setSelectedBook] = useState('');
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`/api/books`, {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBook(event.target.value);
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange(event);
        event.target.size = 1;
        event.target.blur();
    }

    // Function that happens when adding favorite book.
    const addFavBook = async () => {
        try {
            await Post('/api/favBooks', { userId: userId, bookId: selectedBook });
            console.log('Fav Book added to user successfully');
        } catch (error) {
            console.log('Error adding favorite book:', error);
        }
        navigate(`/profile/edit/${userId}`, { replace: true });
    };
    async function goBack() {
        navigate(-1);
    }

    return (<div className="create-book outlet-content template yellow-bg ">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <button onClick={goBack} className="btn btn-success mt-3 ms-3"> <img src="/back_arrow.png" alt="Go Back" /> </button>
                </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-12 ">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className='form-container-forms p-5 rounded bg-white '>
                            <h2 className="text-center fav-title">Add a Favorite Book:</h2>
                            <label className="fav-labels text-center" htmlFor="book">Select a book:</label>
                            <div className="d-flex align-items-center justify-content-center">
                                <select id="book"
                                    className="form-select w-50"
                                    value={selectedBook}
                                    onChange={handleSelectChange}
                                    onFocus={(event: React.FocusEvent<HTMLSelectElement>) => { event.target.size = 5; }}
                                    onBlur={(event: React.FocusEvent<HTMLSelectElement>) => { event.target.size = 1; }}
                                >
                                    <option value="">Select</option>
                                    {books
                                        ?.sort((book: Book, book2: Book) => book.title.localeCompare(book2.title))
                                        .filter((book: Book, index: number) => index === 0 || books[index - 1].bookId != book.bookId )
                                        .map(book => (
                                            <option key={book.bookId} value={book.bookId}> {book.title} </option>
                                        ))}
                                </select>
                            </div>
                            <div className='d-grid d-flex align-items-center justify-content-center'>
                                <button className='btn btn-primary w-40 fav-buttons' disabled={!selectedBook } onClick={addFavBook}>Add Book to Favorites</button>
                            </div>
                            <p className="text-center">Don&apos;t see your favorite book? <br /> Make sure it is on a bookshelf first.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}