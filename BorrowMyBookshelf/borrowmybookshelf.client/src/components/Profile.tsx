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

export default function Profile() {
    const userId = GetCurrentUser()?.userId ?? -1;
    const [user, setUser] = useState<User | undefined>();
    const [favAuthors, setFavAuthors] = useState<FavAuthor[] | undefined>();
    const [favBooks, setFavBooks] = useState<FavBook[] | undefined>();
    const [favGenres, setFavGenres] = useState<FavGenre[] | undefined>();

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
            setFavAuthors(response.data.map(favAuthor => new FavAuthor(favAuthor)));
        } catch (error) {
            console.error('Error fetching favorite authors data:', error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchFavAuthors(userId);
        }
    }, [userId]);

    // fetching FavBooks
    const fetchFavBooks = async (id: number) => {
        try {
            const response = await axios.get<FavBook[]>(`/api/favBooks/users/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setFavBooks(response.data.map(favBook => new FavBook(favBook)));
        } catch (error) {
            console.error('Error fetching favorite books data:', error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchFavBooks(userId);
        }
    }, [userId]);

    // fetching FavGenres
    const fetchFavGenres = async (id: number) => {
        try {
            const response = await axios.get<FavGenre[]>(`/api/favGenres/users/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setFavGenres(response.data.map(favGenre => new FavGenre(favGenre)));
        } catch (error) {
            console.error('Error fetching favorite genres data:', error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchFavGenres(userId);
        }
    }, [userId]);

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{GetCurrentUser()?.firstName ?? ""} {GetCurrentUser()?.lastName ?? ""}&apos;s Profile</h2>
                    <div className="nav navbar-nav left-align-btns">
                    <Link to={`/profile/edit/${userId}`}>
                        <button className="btn btn-success nav-item ms-3"> <img src="/edit.png" alt="Edit" /> </button>
                    </Link>
                    </div>
                </div>
            </nav>
            <main>
                <label htmlFor="user-notes" className="notes mr-2">Notes:</label>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <textarea id="user-notes" rows={5} value={ user?.notes || '' } className="user-notes" readOnly={true} />
                </div> 
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
                                                </tr>)
                                            }
                                            </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <table className=" table table-striped profile-table" aria-labelledby="tableLabel">
                                        <thead>
                                            <th>Favorite Books:</th>
                                        </thead>
                                        <tbody>
                                            {favBooks?.map(favBook =>
                                                <tr key={favBook.favBookId}>
                                                    <td>{favBook.book.title}</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <table className=" table table-striped profile-table" aria-labelledby="tableLabel">
                                    <thead>
                                        <th className="colored">Favorite Genres:</th>
                                    </thead>
                                    <tbody>
                                        {favGenres?.map(favGenre =>
                                            <tr key={favGenre.favGenreId}>
                                                <td>{favGenre.genre.genreType}</td>
                                            </tr>)
                                        }
                                        </tbody>
                                    </table>
                                </div>
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
