import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { useNavigate } from 'react-router-dom';
import { Post } from '../helpers/NetworkHelper';
import { Author, getAuthorFullName } from '../models/Author';

export default function AddFavAuthor() {
    const [authors, setAuthors] = useState<Author[] | undefined>();
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`/api/authors`, {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
                setAuthors(response.data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAuthor(event.target.value);
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange(event);
        event.target.size = 1;
        event.target.blur();
    }

    // Function that happens when adding favorite author.
    const addFavAuthor = async () => {
        try {
            await Post('/api/favAuthors', { userId: userId, authorId: selectedAuthor });
            console.log('Fav Author added to user successfully');
        } catch (error) {
            console.log('Error adding favorite author:', error);
        }
        navigate(`/profile/edit/${userId}`, { replace: true });
    };
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
                            <div className='form-container-forms p-5 rounded bg-white '>
                                <h2 className="text-center fav-title">Add a Favorite Author:</h2>
                                <label className="fav-labels text-center" htmlFor="author">Select an author:</label>
                                <div className="d-flex align-items-center justify-content-center">
                                    <select id="author"
                                        className="form-select w-50"
                                        value={selectedAuthor}
                                        onChange={handleSelectChange}
                                        onFocus={(event: React.FocusEvent<HTMLSelectElement>) => { event.target.size = 5; }}
                                        onBlur={(event: React.FocusEvent<HTMLSelectElement>) => { event.target.size = 1; }}
                                    >
                                        <option value="">Select</option>
                                        {
                                            authors
                                                ?.sort((author: Author, author2: Author) => author.firstName.localeCompare(author2.firstName))
                                                .filter((author: Author, index: number) => index === 0 || authors[index - 1].authorId != author.authorId)
                                            .map(author => (
                                                <option key={author.authorId} value={author.authorId}> {getAuthorFullName(author)} </option>
                                            ))}
                                    </select>
                                </div>
                                <div className='d-grid d-flex align-items-center justify-content-center'>
                                    <button className='btn btn-primary w-40 fav-buttons' disabled={!selectedAuthor} onClick={addFavAuthor}>Add Author to Favorites</button>
                                </div>
                                <p className="text-center">Don&apos;t see your favorite author? <br /> Create a book using your favorite author on a bookshelf first.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}