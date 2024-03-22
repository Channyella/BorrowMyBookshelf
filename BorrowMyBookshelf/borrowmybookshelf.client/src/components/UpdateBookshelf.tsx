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
            const bookshelfInfo = new Bookshelf(response.data);
            setBookshelf(bookshelfInfo);
            setName(bookshelfInfo.bookshelfName);
            
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    }
    async function goBack() {
        navigate(-1);
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
                                <form id="new-book" >
                                    <h3 className="text-center">Update Bookshelf</h3>
                                    <div className='mb-2'>
                                        <label className="text-align-start" htmlFor="name">Name</label>
                                        <input type="text" value={name} placeholder={name} className='form-control' name="name" onChange={handleNameChange} />
                                    </div>
                                </form>
                                <div className='d-grid'>
                                    <button className='btn btn-primary' disabled={!name} onClick={updateBookshelf}>Update Bookshelf</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}