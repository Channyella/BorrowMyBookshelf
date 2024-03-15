import React, { useEffect, useState } from 'react';
import './style.css';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { User } from '../models/User';
import axios, { AxiosResponse } from 'axios';
import { FavAuthor } from '../models/FavAuthor';
import { FavBook } from '../models/FavBook';
import { FavGenre } from '../models/FavGenre';
import { getAuthorFullName } from '../models/Author';
import { Link } from 'react-router-dom';
import { Put } from '../helpers/NetworkHelper';
import OKModal from './OKModal';

export default function EditUserProfile() {
    const userId = GetCurrentUser()?.userId ?? -1;
    const [user, setUser] = useState<User | undefined>();
    const [notes, setNotes] = useState<string>('');
    const [favAuthors, setFavAuthors] = useState<FavAuthor[] | undefined>();
    const [favBooks, setFavBooks] = useState<FavBook[] | undefined>();
    const [favGenres, setFavGenres] = useState<FavGenre[] | undefined>();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        populateUserData(userId);
    }, [userId]);


    // fetching FavAuthors
    const fetchFavAuthors = async (id: number) => {
        try {
            const response = await axios.get<FavAuthor[]>(`/api/favAuthors/users/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setFavAuthors(response.data);
        } catch (error) {
            console.error('Error fetching favorite authors data:', error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchFavAuthors(userId);
        }
    }, [userId]);

    // delete FavAuthors
    const deleteFavAuthors = async (favAuthorId: number) => {
        try {
            await axios.delete(`/api/favAuthors/${favAuthorId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            await fetchFavAuthors(GetCurrentUser()?.userId ?? -1);
            return true;
        } catch (error) {
            console.error('Error deleting favorite author:', error);
            return false;
        }
    };

    // fetching FavBooks
    const fetchFavBooks = async (id: number) => {
        try {
            const response = await axios.get<FavBook[]>(`/api/favBooks/users/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setFavBooks(response.data);
        } catch (error) {
            console.error('Error fetching favorite books data:', error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchFavBooks(userId);
        }
    }, [userId]);

    // delete FavBooks
    const deleteFavBooks = async (favBookId: number) => {
        try {
            await axios.delete(`/api/favBooks/${favBookId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            await fetchFavBooks(GetCurrentUser()?.userId ?? -1);
            return true;
        } catch (error) {
            console.error('Error deleting favorite books:', error);
            return false;
        }
    };

    // fetching FavGenres
    const fetchFavGenres = async (id: number) => {
        try {
            const response = await axios.get<FavGenre[]>(`/api/favGenres/users/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setFavGenres(response.data);
        } catch (error) {
            console.error('Error fetching favorite genres data:', error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchFavGenres(userId);
        }
    }, [userId]);

    // delete FavGenres
    const deleteFavGenres = async (favGenreId: number) => {
        try {
            await axios.delete(`/api/favGenres/${favGenreId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            await fetchFavGenres(GetCurrentUser()?.userId ?? -1);
            return true;
        } catch (error) {
            console.error('Error deleting favorite genres:', error);
            return false;
        }
    };

    // fetch user notes
    const fetchNotes = async (id: number) => {
        try {
            const response = await axios.get<User>(`/api/users/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            const user = response.data;
            setNotes(user.notes ?? "");
        } catch (error) {
            console.error("Error fetching user notes:", error);
        }
    }

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    }

    useEffect(() => {
        if (userId) {
            fetchNotes(userId);
        }
    }, [userId]);

    // update User Notes & Modal functions
    const saveNotes = async (userId: number) => {
        try {
            await Put(`/api/users/${userId}`, { notes });
            console.log('Notes saved successfully');
            setShowModal(true);
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">Editing {GetCurrentUser()?.firstName ?? ""} {GetCurrentUser()?.lastName ?? ""}&apos;s Profile</h2>
                    <div className="nav navbar-nav left-align-btns">
                        <Link to={`/profile`}>
                            <button className="btn btn-success nav-item ms-3"> <img src="/back_arrow.png" alt="Edit" /> </button>
                        </Link>
                    </div>
                </div>
            </nav>
            <main>
                <label htmlFor="user-notes" className="mr-2 notes">Notes:</label>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <textarea id="user-notes"
                        rows={5}
                        value={notes}
                        className="user-notes"
                        onChange={handleNotesChange}
                    />
                </div>
                <div className="save-btn d-flex align-items-end justify-content-end">
                    <button className="btn btn-success nav-item ms-3"
                        onClick={ () => saveNotes(userId) }> Save Notes</button>
                </div>
                {showModal && (
                    <OKModal
                        message="Your notes have been successfully saved."
                        onConfirm={closeModal}
                        />
                ) }
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-striped profile-table" aria-labelledby="tableLabel">
                                        <thead>
                                            <th>Favorite Authors:</th>
                                        </thead>
                                        <tbody>
                                            {favAuthors?.map(favAuthor =>
                                                <tr key={favAuthor.favAuthorId}>
                                                    <td>{getAuthorFullName(favAuthor.author)}</td>
                                                    <td onClick={() => deleteFavAuthors(favAuthor.favAuthorId)} className="weird-width"><button className="btn btn-success nav-item ms-3"><img src="/delete.png" alt="Delete Bookshelf" /></button></td>

                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="profile-btn d-flex align-items-end justify-content-end">
                                <Link to={`/profile/add-fav-authors`}>
                                    <button className="btn btn-success nav-item ms-3"> Add Authors</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-striped profile-table" aria-labelledby="tableLabel">
                                        <thead>
                                            <th>Favorite Books:</th>
                                        </thead>
                                        <tbody>
                                            {favBooks?.map(favBook =>
                                                <tr key={favBook.favBookId}>
                                                    <td>{favBook.book.title}</td>
                                                    <td onClick={() => deleteFavBooks(favBook.favBookId)} className="weird-width"><button className="btn btn-success nav-item ms-3"><img src="/delete.png" alt="Delete Bookshelf" /></button></td>

                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="profile-btn d-flex align-items-end justify-content-end">
                                <Link to={`/profile/add-fav-books`}>
                                    <button className="btn btn-success nav-item ms-3"> Add Books </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <table className="table table-striped profile-table" aria-labelledby="tableLabel">
                                        <thead>
                                            <th className="colored">Favorite Genres:</th>
                                        </thead>
                                        <tbody>
                                            {favGenres?.map(favGenre =>
                                                <tr key={favGenre.favGenreId}>
                                                    <td>{favGenre.genre.genreType}</td>
                                                    <td onClick={() => deleteFavGenres(favGenre.favGenreId) } className="weird-width"><button className="btn btn-success nav-item ms-3"><img src="/delete.png" alt="Delete Bookshelf" /></button></td>

                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="profile-btn d-flex align-items-end justify-content-end">
                                <Link to={`/profile/add-fav-genres`}>
                                    <button className="btn btn-success nav-item ms-3"> Add Genres </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
    async function populateUserData(userId: number) {
        const response: AxiosResponse<User> = await axios.get(`api/users/${userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUser(response.data);
    }
}