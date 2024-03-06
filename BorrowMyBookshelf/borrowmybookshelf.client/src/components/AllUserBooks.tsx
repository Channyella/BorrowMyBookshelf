import './style.css';
import React, { useEffect, useState, } from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { UserBook } from '../models/UserBook';
import { Genre } from '../models/Genre';
import { Link } from 'react-router-dom';

export default function Home() {
    const [userBooks, setUserBooks] = useState<UserBook[] | undefined>();
    const userId = GetCurrentUser()?.userId;
    useEffect(() => {
        populateUserBookData();
    }, []);

    enum BookFormat {
        Hardcover = 1,
        Paperback = 2,
        eBook = 3,
        AudioBook = 4
    }

    const getBookFormatString = (format: BookFormat): string => {
        switch (format) {
            case BookFormat.Hardcover:
                return "Hardcover";
            case BookFormat.Paperback:
                return "Paperback";
            case BookFormat.eBook:
                return "eBook";
            case BookFormat.AudioBook:
                return "Audio Book";
            default:
                return "Unknown";
        }
    }

    const maybeShortenGenresListDisplay = (genres: Genre[]): string => {
        if (genres.length <= 3) {
            return genres.map(genre => genre.genreType).join(", ");
        }
        return genres.slice(0,3).map(genre => genre.genreType).join(", ") + ", ...";
    }

    const contents = userBooks === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Page Count</th>
                    <th>Audio Length</th>
                    <th>Genres</th>
                    <th>Borrowable</th>
                    <th>Book Format</th>
                </tr>
            </thead>
            <tbody>
                {userBooks.map(userBook =>
                    <tr key={userBook.userId}>
                        <td>{userBook.book.title}</td>
                        <td>{`${userBook.book.author.firstName} ${userBook.book.author.middleName ?? ""} ${userBook.book.author.lastName}`}</td>
                        <td>{userBook.book.pageCount}</td>
                        <td>{userBook.book.audioLength}</td>
                        <td>{maybeShortenGenresListDisplay(userBook.book.genres)}</td>
                        <td>{userBook.borrowable ? "Yes" : "No"}</td>
                        <td>{getBookFormatString(userBook.bookFormat)}</td>
                        <td>
                            <button className="btn btn-success"><img src="/vert_dropdown.png" alt="Details"></img></button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">All {GetCurrentUser()?.firstName ?? ""}'s Books</h2>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"
                        />
                        <button className="btn btn-success nav-item ms-3"> <img src="/filter.png" alt="Filter"/> </button>
                        <button className="btn btn-success nav-item ms-3"> <img src="/sort.png" alt="Sort" /></button>
                    </div>
                </div>
            </nav>
            {contents}
        </div>
    );
    async function populateUserBookData() {
        const response: AxiosResponse<UserBook[]> = await axios.get(`api/userBooks/user-id/${userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUserBooks(response.data);
    }
}