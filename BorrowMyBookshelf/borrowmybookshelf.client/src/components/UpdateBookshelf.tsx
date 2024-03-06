import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import BookshelfContext from '../context/BookshelfContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Bookshelf } from '../models/Bookshelf';

export default function AddBookshelf() {
    const { bookshelfId } = useParams<{ bookshelfId: string }>() ?? "";
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);
    const { refreshBookshelf } = useContext(BookshelfContext);
    const [name, setName] = useState<string>('');
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();

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

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const updateBookshelf = async () => {
        event?.preventDefault();
        try {
            const formData = new FormData();
            formData.append('bookshelfName', name);

            await axios.put(`/api/bookshelves/${bookshelfId}`, formData,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            await refreshBookshelf(userId);
            navigate(`/bookshelf-books/${bookshelfId}`);
        } catch (error) {
            console.error('Error updating bookshelf:', error);
        }
    };

    return (
        <div className="create-book outlet-content template d-flex justify-content-center align-items-center yellow-bg">
            <div className='form-container-forms p-5 rounded bg-white'>
                <form id="new-book">
                    <h3 className="text-center">Update Bookshelf</h3>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" value={name} placeholder={bookshelf?.bookshelfName} className='form-control' name="name" onChange={handleNameChange} />
                    </div>
                </form>
                <div className='d-grid'>
                    <button className='btn btn-primary' onClick={updateBookshelf}>Create Bookshelf</button>
                </div>
            </div>
        </div>
    )
}