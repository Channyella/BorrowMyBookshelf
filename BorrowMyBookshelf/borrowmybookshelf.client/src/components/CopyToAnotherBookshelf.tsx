import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Bookshelf } from '../models/Bookshelf';
import { Book } from '../models/Book';
import { UserBook } from '../models/UserBook';
import { getAuthorFullName } from '../models/Author';
import { AddBookToBookshelf } from '../helpers/BookHelper';

export default function CopyToAnotherBookshelf() {
    const { userBookId } = useParams<{ userBookId: string }>() ?? "";
    const [userBook, setUserBook] = useState<UserBook | null>(null);
    const [title, setTitle] = useState<string>('');
    const [name, setName] = useState<string>('');
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();
    const [bookshelves, setBookshelves] = useState<Bookshelf[] | undefined>();
    const [selectedBookshelf, setSelectedBookshelf] = useState('');

    // fetch selected book
    const fetchUserBook = async (id: string) => {
        try {
            const response = await axios.get<UserBook>(`/api/userBooks/${id}/detailed`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            const userBook = new UserBook(response.data);
            setTitle(userBook.book.title);
            setUserBook(userBook);
            setName(getAuthorFullName(userBook.book.author));
        } catch (error) {
            console.error('Error fetching book data:', error);
        }
    }

    useEffect(() => {
        if (userBookId) {
            fetchUserBook(userBookId);
        }
    }, [userBookId]);

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
        if (!userBook || !selectedBookshelf) return;
        await AddBookToBookshelf({userBookId: userBook.userBookId, bookId: userBook.book.bookId, bookshelfId: parseInt(selectedBookshelf), bookFormat: userBook.bookFormat, borrowable: userBook.borrowable, title, userId, genreTypes: [] })
        navigate(`/bookshelf-books/${selectedBookshelf}`);
    }


    return (
        <div className="create-book outlet-content template d-flex justify-content-center align-items-center yellow-bg">
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
                </form>
                <div className='d-grid'>
                    <button onClick={copyBookToBookshelf} className='btn btn-primary' >Add Book To Bookshelf</button>
                </div>
            </div>
        </div>
    )
}