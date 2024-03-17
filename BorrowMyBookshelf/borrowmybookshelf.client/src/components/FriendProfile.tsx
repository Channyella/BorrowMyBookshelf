import React, { useEffect, useState } from 'react';
import './style.css';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { User } from '../models/User';
import axios, { AxiosResponse } from 'axios';
import { FavAuthor } from '../models/FavAuthor';
import { FavBook } from '../models/FavBook';
import { FavGenre } from '../models/FavGenre';
import { getAuthorFullName } from '../models/Author';
import { Link, useParams } from 'react-router-dom';

export default function FriendProfile() {
    const { userId } = useParams<{ userId: string }>();
    const friendUserId = userId ? parseInt(userId, 10) : -1;
    const [user, setUser] = useState<User | undefined>();
    const [favAuthors, setFavAuthors] = useState<FavAuthor[] | undefined>();
    const [favBooks, setFavBooks] = useState<FavBook[] | undefined>();
    const [favGenres, setFavGenres] = useState<FavGenre[] | undefined>();

    useEffect(() => {
        populateUserData(friendUserId);
    }, [friendUserId]);

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
        if (friendUserId) {
            fetchFavAuthors(friendUserId);
        }
    }, [friendUserId]);

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
        if (friendUserId) {
            fetchFavBooks(friendUserId);
        }
    }, [friendUserId]);

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
        if (friendUserId) {
            fetchFavGenres(friendUserId);
        }
    }, [friendUserId]);

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{user?.firstName ?? ""} {user?.lastName ?? ""}&apos;s Profile</h2>
                </div>
            </nav>
            <main>
                <label htmlFor="user-notes" className="notes mr-2">Notes:</label>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <textarea id="user-notes" rows={5} value={user?.notes || ''} className="user-notes" readOnly={true} />
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
    async function populateUserData(friendUserId: number) {
        const response: AxiosResponse<User> = await axios.get(`/api/users/${friendUserId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUser(response.data);
    }
}