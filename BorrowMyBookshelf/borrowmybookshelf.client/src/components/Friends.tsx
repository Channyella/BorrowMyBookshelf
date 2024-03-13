import React, { useEffect, useState } from 'react';
import './style.css';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { Friend } from '../models/Friend';
import { User } from '../models/User';

export default function Friends() {
    const [friends, setFriends] = useState<Friend[] | undefined>();
    //const [searchFilter, setSearchFilter] = useState<(friend: Friend) => boolean>(() => () => true);
    const [openDropDown, setDropDown] = useState(-1);
    const userId = GetCurrentUser()?.userId;
    const [user, setUser] = useState<User[] | undefined>();

    useEffect(() => {
        populateFriendData();
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

    const contents = friends === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {friends.map(friend =>
                    <tr key={friend.friendId}>
                        <td> {/* Friend First Name*/ }</td>
                        <td> {/* Friend Last Name*/} </td>
                        <td> <button onClick={makeBookDropDownFunction(friend.friendId)} className="btn btn-warning"><img src="/vert_dropdown.png" alt="Details"></img></button>
                         {/* Put FriendDropDownMenu here with fields, friend_id and refreshPage Like:
                             {openDropDown == friend.friendId && (
                             <FriendDropDownMenu friendId = {friend.friendId}
                                refreshPage = {refreshPage} */}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{GetCurrentUser()?.firstName ?? ""}&apos;s Friends</h2>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"/>
                        <button className="btn btn-success nav-item ms-3"> <img src="/filter.png" alt="Filter" /> </button>
                        <button className="btn btn-success nav-item ms-3"> <img src="/sort.png" alt="Sort" /></button>
                    </div>
                </div>
            </nav>
            {contents} 
            {/* Put Sort Friend Modal Here, just sort by first and last name */}
        </div>
    );

    
    // Make backend component that grabs friends if requesterId = user_id && accepted == true
    async function populateFriendData() {
        const response: AxiosResponse<Friend[]> = await axios.get('api/friends', {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setFriends(response.data);
    }
}