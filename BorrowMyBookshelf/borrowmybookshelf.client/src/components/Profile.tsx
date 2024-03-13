import React, { useEffect, useState } from 'react';
import './style.css';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { User } from '../models/User';
import axios, { AxiosResponse } from 'axios';

export default function Profile() {
    const userId = GetCurrentUser()?.userId;
    const [user, setUser] = useState<User[] | undefined>();

    useEffect(() => {
        populateUserData();
    }, []);

    return (
        <div className="wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{GetCurrentUser()?.firstName ?? ""} {GetCurrentUser()?.lastName ?? ""}&apos;s Profile</h2>
                    <div className="nav navbar-nav left-align-btns">
                        <button className="btn btn-success nav-item ms-3"> <img src="/edit.png" alt="Edit" /> </button>
                    </div>
                </div>
            </nav>

        </div>
    );
    async function populateUserData() {
        const response: AxiosResponse<User[]> = await axios.get('api/users', {
            withCredentials: true,
            headers: GetAuthHeader(),
        });
        setUser(response.data);
    }
}
