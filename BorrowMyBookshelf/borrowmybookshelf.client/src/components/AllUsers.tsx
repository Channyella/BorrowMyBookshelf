import React, { useEffect, useState } from 'react';
import './style.css';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser} from '../helpers/AuthHelper';
import { User } from '../models/User';
import { Link } from 'react-router-dom';
import { Post, Put } from '../helpers/NetworkHelper';
import OKModal from './OKModal';
import { Friend } from '../models/Friend';

export default function AllUsers() {
    const [users, setUsers] = useState<User[] | undefined>();
    const [searchFilter, setSearchFilter] = useState<(user: User) => boolean>(() => () => true);
    const currentUser = GetCurrentUser();
    const [showModal, setShowModal] = useState(-1);
    const [showOkModal, setShowOkModal] = useState(-1);
    const [allFriends, setAllFriends] = useState<Map<number, Friend>>(new Map());


    const handleConfirm = () => {
        setShowModal(-1);
        refreshPage();
    };
     
    useEffect(() => {
        refreshPage();
    }, []);

    const refreshPage = () => Promise.all([populateUserData(), getAllFriendInfo()]);

    const search = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        if (!searchValue) {
            return setSearchFilter(() => () => true);
        }
        setSearchFilter(() => (user: User) => {
            const fullName = user.firstName + " " + user.lastName;
            return user.email.toLowerCase().includes(searchValue) ||
                fullName.toLowerCase().includes(searchValue);
        })
    }

    const sendFriendRequest = async (userId: number) => {
        await Post(`/api/friends`, {
            'requesterUserId': currentUser?.userId,
            'receiverUserId': userId
        });
        setShowModal(userId);
    }

    // Accept function & Model functions
    const acceptFriend = async (friendId: number) => {
        await Put(`/api/friends/${friendId}`, {});
        setShowOkModal(friendId);
    }

    const handleOkConfirm = () => {
        setShowOkModal(-1);
        refreshPage();
    };

    const contents = users === undefined
        ? <p><em>Loading... </em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.filter((user) => user.userId != currentUser?.userId).filter((user) => searchFilter(user)).map(user =>
                    <tr key={user.userId}>
                        <td> {user.firstName}</td>
                        <td> {user.lastName} </td>
                        <td> {user.email} </td>
                        {!allFriends.get(user.userId) && (<td> <button onClick={() => sendFriendRequest(user.userId)} className="btn btn-warning">Send Friend Request</button> {showModal == user.userId && (
                            <OKModal
                                message={`Friend request sent to ${user.firstName} ${user.lastName}.`}
                                onConfirm={handleConfirm} />
                        )}</td>)}
                        {allFriends.get(user.userId)?.accepted && (<td><button className="btn btn-success" disabled>Already Friends</button></td>)}
                        {!!allFriends.get(user.userId) && !allFriends.get(user.userId)?.accepted && !allFriends.get(user.userId)?.isRequester && (<td><button className="btn btn-warning" disabled>Request Pending...</button></td>)}
                        {!!allFriends.get(user.userId) && !allFriends.get(user.userId)?.accepted && !!allFriends.get(user.userId)?.isRequester && (<td>< button onClick={() => acceptFriend(allFriends.get(user.userId)?.friendId ?? -1)} className="btn btn-success">Accept Friend Request</button>
                            {showOkModal == allFriends.get(user.userId)?.friendId && (
                                <OKModal
                                    message={`You are now friends with ${allFriends.get(user.userId)?.friendUserInfo.firstName} ${allFriends.get(user.userId)?.friendUserInfo.lastName}!`}
                                    onConfirm={handleOkConfirm}
                                />
                            )}</td>)}

                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">All Users</h2>
                    <div className="nav navbar-nav left-align-btns">
                        <Link to={`/friends`}>
                            <button className="btn btn-success nav-item ms-3"><img src="/friends.png" alt="View Friends" /> View Friends</button>
                        </Link>
                        <Link to={`/friends/all-users`}>
                            <button className="btn btn-success nav-item ms-3"><img src="/view_users.png" alt="View All Users" /> View All Users</button>
                        </Link>
                        <Link to={`/friends/friend-requests`}>
                            <button className="btn btn-success nav- ms-3"> <img src="/Add_Friends.png" alt="Friend Requests" /> Friend Requests </button>
                        </Link>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <input className="nav-item custom-input"
                            type="text"
                            placeholder="Search"
                            onChange={ search }
                        />
                    </div>
                </div>
            </nav>
            {contents}
        </div>
    );

    async function populateUserData() {
        const response: AxiosResponse<User[]> = await axios.get('/api/users', {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUsers(response.data);
    }
    async function getAllFriendInfo() {
        const [friendInfoResponse, friendRequestResponse] = await Promise.all([axios.get<Friend[]>(`/api/friends/friend-info/${currentUser?.userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        }), axios.get<Friend[]>(`/api/friends/friend-requests/${currentUser?.userId}`, {
            withCredentials: true,
            headers: GetAuthHeader(),
        })]);
        const friendRequests = friendRequestResponse.data.map(friend => new Friend(friend));
        const friends = friendInfoResponse.data.map(friend => new Friend(friend));
        const friendMap = new Map<number, Friend>();
        friends.map(friend => friendMap.set(friend.friendUserInfo.userId, friend));
        friendRequests.map(friend => friendMap.set(friend.friendUserInfo.userId, friend));
        setAllFriends(friendMap);
        return friendMap;
    }
}