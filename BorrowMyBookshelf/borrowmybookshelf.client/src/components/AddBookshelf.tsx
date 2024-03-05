import React, { useState, useContext } from 'react';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser} from '../helpers/AuthHelper';
import BookshelfContext from '../context/BookshelfContext';
import { useNavigate } from 'react-router-dom';

export default function AddBookshelf() {
    const { refreshBookshelf } = useContext(BookshelfContext);
    const [name, setName] = useState<string>('');
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const createBookshelf = async () => {
        event?.preventDefault();
        const formData = new FormData();
        const bookshelf = {
            'userId': userId,
            'bookshelfName': name,
        };
        for (const pair of Object.entries(bookshelf)) {
            formData.append(pair[0], pair[1].toString());
        }

        const id = await axios.post<number>('/api/bookshelves', formData,
            {
                withCredentials: true,
                headers: GetAuthHeader(),
            });
        await refreshBookshelf();
        console.log(`/bookshelf-books/${id.data}`);
        navigate(`/bookshelf-books/${id.data}`);
    }

    return (
        <div className="create-book outlet-content template d-flex justify-content-center align-items-center yellow-bg">
            <div className='form-container-forms p-5 rounded bg-white'>
                <form id="new-book">
                    <h3 className="text-center">Create New Bookshelf</h3>
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" value={name} placeholder="Enter Name" className='form-control' name="name" onChange={handleNameChange} />
                    </div>
                </form>
                <div className='d-grid'>
                    <button className='btn btn-primary' onClick={createBookshelf}>Create Bookshelf</button>
                </div>
            </div>
        </div>
    )
}