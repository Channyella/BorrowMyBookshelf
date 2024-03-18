import React, { useEffect, useState } from 'react';
import './style.css';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { Link } from 'react-router-dom';
import { Friend } from '../models/Friend';
import ConfirmModal from './ConfirmModal';
import { Put } from '../helpers/NetworkHelper';
import OKModal from './OKModal';

export default function FriendRequests() {
    const [friends, setFriends] = useState<Friend[] | undefined>();
    const [searchFilter, setSearchFilter] = useState<(friend: Friend) => boolean>(() => () => true);
    const currentUser = GetCurrentUser();
    const [showModal, setShowModal] = useState(-1);
    const [showOkModal, setShowOkModal] = useState(-1);

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

    // Accept function & Model functions
    const acceptFriend = async (friendId: number) => {
        await Put(`/api/friends/${friendId}`, {});
        setShowOkModal(friendId);
    }

    const handleOkConfirm = () => {
        setShowOkModal(-1);
        populateFriendData();
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
                            {friend.isRequester ? < button onClick={() => acceptFriend(friend.friendId)} className="btn btn-warning">Accept Friend Request</button> : < button className="btn btn-warning" disabled>Pending...</button> }
                            {showOkModal == friend.friendId && (
                                <OKModal
                                    message={`You are now friends with ${friend.friendUserInfo.firstName} ${friend.friendUserInfo.lastName}!`}
                                    onConfirm={handleOkConfirm}
                                />
                            )}
                        </td>
                        <td>
                            <button onClick={() => confirmDelete(friend.friendId)} className="btn btn-success nav-item ms-3"><img src="/delete.png" alt="Delete Request" /></button>
                            {showModal == friend.friendId && (
                                <ConfirmModal
                                    message={`Are you sure you want to delete your friend request from ${friend.friendUserInfo.firstName} ${friend.friendUserInfo.lastName}?`}
                                    onConfirm={() => handleConfirm(friend.friendId)}
                                    onCancel={handleCancel}
                                />
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">Friend Requests</h2>
                    <div className="nav navbar-nav left-align-btns">
                        <Link to={`/friends`}>
                            <button className="btn btn-success nav-item ms-3"><img src="/friends.png" alt="View Friends" /> View Friends</button>
                        </Link>
                        <Link to={`/friends/all-users`}>
                            <button className="btn btn-success nav-item ms-3"><img src="/view_users.png" alt="View All Users" /> View All Users</button>
                        </Link>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"
                            onChange={search}
                        />
                    </div>
                </div>
            </nav>
            {contents}
        </div>
    );

    async function populateFriendData() {
        const response: AxiosResponse<Friend[]> = await axios.get(`/api/friends/friend-requests/${currentUser?.userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setFriends(response.data);
    }
}