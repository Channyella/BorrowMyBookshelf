import React, { useEffect, useState } from 'react';
import './style.css';
import axios, { AxiosResponse } from 'axios';
import { GetAuthHeader, GetCurrentUser} from '../helpers/AuthHelper';
import { User } from '../models/User';
import { Link } from 'react-router-dom';
import { Post } from '../helpers/NetworkHelper';
import OKModal from './OKModal';

export default function AllUsers() {
    const [users, setUsers] = useState<User[] | undefined>();
    const [searchFilter, setSearchFilter] = useState<(user: User) => boolean>(() => () => true);
    const currentUser = GetCurrentUser();
    const [showModal, setShowModal] = useState(-1);

    const handleConfirm = () => {
        setShowModal(-1);
    };
     
    useEffect(() => {
        populateUserData();
    }, []);

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

    const contents = users === undefined
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
                {users.filter((user) => user.userId != currentUser?.userId).filter((user) => searchFilter(user)).map(user =>
                    <tr key={user.userId}>
                        <td> {user.firstName}</td>
                        <td> {user.lastName} </td>
                        <td> {user.email} </td>
                        <td> <button onClick={() => sendFriendRequest(user.userId)} className="btn btn-warning">Send Friend Request</button></td>
                        {showModal == user.userId && (
                            <OKModal
                                message={`Friend request sent to ${user.firstName} ${user.lastName}.`}
                                onConfirm={ handleConfirm }/>
                        )}
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
}