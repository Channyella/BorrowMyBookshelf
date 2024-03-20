import axios from 'axios';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { UserBook, makeUserBook } from '../models/UserBook';

interface UserBooksContextType {
    userBooks: UserBook[],
    setUserBooks: React.Dispatch<React.SetStateAction<UserBook[]>>;
    refreshUserBooks: (userId: number) => void;
}

const initialUserBooksContext: UserBooksContextType = {
    userBooks: [],
    setUserBooks: () => { },
    refreshUserBooks: () => { },
};

const UserBooksContext = createContext<UserBooksContextType>(initialUserBooksContext);

interface UserBooksProviderProps {
    children: ReactNode;
}

export const UserBooksProvider: React.FC<UserBooksProviderProps> = ({ children }) => {
    const [userBooks, setUserBooks] = useState<UserBook[]>(initialUserBooksContext.userBooks);

    const fetchUserBooksData = async (userId: number) => {
        try {
            const response = await axios.get<UserBook[]>(`/api/userBooks/user-id/${userId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setUserBooks(response.data.map(userBook => makeUserBook(userBook)));
        } catch (error) {
            console.error('Error fetching user book data:', error);
        }
    };

    useEffect(() => {
        const userId = GetCurrentUser()?.userId ?? -1;
        fetchUserBooksData(userId);
    }, []);

    const refreshUserBooks = (userId: number) => {
        fetchUserBooksData(userId);
    };
    return (
        <UserBooksContext.Provider value={{ userBooks, setUserBooks, refreshUserBooks }}>
            {children}
        </UserBooksContext.Provider>
    );
};
export default UserBooksContext;