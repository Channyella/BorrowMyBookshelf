import React, { useEffect, useState } from 'react';
import './style.css';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { Link } from 'react-router-dom';
import { Friend } from '../models/Friend';
import ConfirmModal from './ConfirmModal';

export default function Friends() {
    const [friends, setFriends] = useState<Friend[] | undefined>();
    const [searchFilter, setSearchFilter] = useState<(friend: Friend) => boolean>(() => () => true);
    const currentUser = GetCurrentUser();
    const [showModal, setShowModal] = useState(-1);

    useEffect(() => {
        populateFriendData();
    }, []);

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        if (!searchValue) {
            return setSearchFilter(() => () => true);
        }
        setSearchFilter(() => (friend: Friend) => {
            const fullName = friend.friendUserInfo.firstName + " " + friend.friendUserInfo.lastName;
            return friend.friendUserInfo.email.toLowerCase().includes(searchValue) ||
                fullName.toLowerCase().includes(searchValue);
        })
    }

    const deleteRequest = async (friendId: number) => {
        try {
            await axios.delete(`/api/friends/${friendId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            return true;
        } catch (error) {
            console.error('Error deleting friend request:', error);
            return false;
        }
    };

    const handleConfirm = async (friendId: number) => {
        setShowModal(-1);
        const isDeleted = await deleteRequest(friendId);
        if (isDeleted) {
            await populateFriendData();
        }
    };

    const handleCancel = () => {
        setShowModal(-1);
    };

    const confirmDelete = (friendId: number) => {
        setShowModal(friendId);
    };

    const contents = friends === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {friends.filter((friend) => searchFilter(friend)).map(friend =>
                    <tr key={friend.friendUserInfo.userId}>
                        <td> {friend.friendUserInfo.firstName}</td>
                        <td> {friend.friendUserInfo.lastName} </td>
                        <td> {friend.friendUserInfo.email} </td>
                        <td>
                            <Link to={`/friends/friend-profile/${friend.friendUserInfo.userId}`}>
                                <button className="btn btn-success nav-item ms-3"><img src="/closed_book.png" alt="View Friend Page" /> View Profile</button>
                            </Link>
                            <button onClick={() => confirmDelete(friend.friendId)} className="btn btn-success nav-item ms-3"><img src="/delete.png" alt="Delete Friend" /></button>
                        </td>
                        {showModal == friend.friendId && (
                            <ConfirmModal
                                message={`Are you sure you want to remove ${friend.friendUserInfo.firstName} ${friend.friendUserInfo.lastName} from your friends?`}
                                onConfirm={() => handleConfirm(friend.friendId)}
                                onCancel={handleCancel}
                            />
                        )}
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{GetCurrentUser()?.firstName ?? ""}&apos;s Friends</h2>
                    <div className="nav navbar-nav left-align-btns">
                        <Link to={`/friends/all-users` }>
                        <button  className="btn btn-success nav-item ms-3"><img src="/view_users.png" alt="View All Users" /> View All Users</button>
                        </Link>
                        <Link to={`/friends/friend-requests`}>
                            <button className="btn btn-success nav- ms-3"> <img src="/Add_Friends.png" alt="Friend Requests" /> Friend Requests </button>
                        </Link>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"
                            onChange={search }
                        />
                    </div>
                </div>
            </nav>
            {contents} 
        </div>
    );

    async function populateFriendData() {
        const response: AxiosResponse<Friend[]> = await axios.get(`/api/friends/friend-info/${currentUser?.userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setFriends(response.data);
    }
}