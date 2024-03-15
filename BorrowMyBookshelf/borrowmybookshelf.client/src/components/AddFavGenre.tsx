import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { useNavigate } from 'react-router-dom';
import { Post } from '../helpers/NetworkHelper';
import { Genre } from '../models/Genre';

export default function AddFavGenre() {
    const [genres, setGenres] = useState<Genre[] | undefined>();
    const [selectedGenre, setSelectedGenre] = useState('');
    const userInfo = GetCurrentUser();
    const userId = userInfo?.userId ?? -1;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`/api/genres`, {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
                setGenres(response.data);
            } catch (error) {
                console.error('Error fetching genre:', error);
            }
        };

        fetchGenres();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(event.target.value);
    }

    // Function that happens when adding favorite genre.
    const addFavGenre = async () => {
        try {
            await Post('/api/favGenres', { userId: userId, genreId: selectedGenre });
            console.log('Fav Genre added to user successfully');
        } catch (error) {
            console.log('Error adding favorite genre:', error);
        }
        navigate(`/profile/edit/${userId}`);
    };

    return (
        <div className="create-book outlet-content template d-flex justify-content-center align-items-center yellow-bg">
            <div className='form-container-forms p-5 rounded bg-white '>
                <h2 className="text-center fav-title">Add a Favorite Genre:</h2>
                <label className="fav-labels text-center" htmlFor="book">Select a Genre:</label>
                <div className="d-flex align-items-center justify-content-center">
                    <select id="book" className="form-select w-50" value={selectedGenre} onChange={handleChange}>
                        <option value="">Select</option>
                        {genres?.map(genre => (
                            <option key={genre.genreId} value={genre.genreId}> {genre.genreType} </option>
                        ))}
                    </select>
                </div>
                <div className='d-grid d-flex align-items-center justify-content-center'>
                    <button className='btn btn-primary w-40 fav-buttons' onClick={addFavGenre}>Add Genre to Favorites</button>
                </div>
                <p className="text-center">Don&apos;t see your favorite genre? <br /> Make sure you have a book that contains this genre on a bookshelf first.</p>
            </div>
        </div>
    )
}