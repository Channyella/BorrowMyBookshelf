import React, { useEffect, useState } from 'react';
import './style.css';
import axios, { AxiosResponse } from 'axios';
import { BookRequest } from '../models/BookRequest';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { User } from '../models/User';

export default function Borrowed() {
    const [bookRequests, setBookRequests] = useState<BookRequest[] | undefined>();
    //const [searchFilter, setSearchFilter] = useState<(friend: Friend) => boolean>(() => () => true);
    const [openDropDown, setDropDown] = useState(-1);
    const userId = GetCurrentUser()?.userId;
    const [user, setUser] = useState<User[] | undefined>();

    useEffect(() => {
        populateBookRequestData();
    }, []);

    const makeBookDropDownFunction = (bookId: number) => {
        return () => {
            if (bookId == openDropDown) {
                return setDropDown(-1);
            }
            setDropDown(bookId);
        }
    }

    //const refreshPage = () => populateFriendData();

    const contents = bookRequests === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Owner</th>
                    <th>Borrower</th>
                    <th>Request Date</th>
                    <th>Status</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody>
                {bookRequests.map(bookRequest =>
                    <tr key={bookRequest.bookRequestId}>
                        <td> {/* Book Title */}</td>
                        <td> {/* Owner's Name */}</td>
                        <td> {/* Borrower's Name */}</td>
                        <td> {/* Request Date*/} </td>
                        <td> {/* Status*/} </td>
                        <td> {/* Due Date*/} </td>
                        <td> <button onClick={makeBookDropDownFunction(bookRequest.bookRequestId)} className="btn btn-warning"><img src="/vert_dropdown.png" alt="Details"></img></button>
                            {/* Put BookRequestDropDownMenu here with parameters, bookRequestId and refreshPage Like:
                            {openDropDown == bookRequest.bookRequestId && (
                            <BookRequestDropDownMenu bookRequestId = {bookRequest.bookRequestId}
                            refreshPage = {refreshPage}
                            The details box should drop down Change Status if you are the owner of the book */}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">What&apos;s Being Borrowed</h2>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search" />
                        <button className="btn btn-success nav-item ms-3"> <img src="/filter.png" alt="Filter" /> </button>
                    </div>
                </div>
            </nav>
            {contents}
            {/* Put Sort Friend Modal Here, just sort by first and last name */}
        </div>
    );


    // Make backend component that grabs friends if requesterId = user_id && accepted == true
    async function populateBookRequestData() {
        const response: AxiosResponse<BookRequest[]> = await axios.get('api/bookRequests', {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setBookRequests(response.data);
    }
}