import axios from 'axios';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Bookshelf } from '../models/Bookshelf';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { useParams } from 'react-router-dom';

interface BookshelfContextType {
    bookshelves: Bookshelf[],
    setBookshelf: React.Dispatch<React.SetStateAction<Bookshelf[]>>;
    refreshBookshelf: (userId: number) => void;
}

const initialBookshelfContext: BookshelfContextType = {
    bookshelves: [],
    setBookshelf: () => { },
    refreshBookshelf: () => { },
};

const BookshelfContext = createContext<BookshelfContextType>(initialBookshelfContext);

interface BookshelfProviderProps {
    children: ReactNode;
}

export const BookshelfProvider: React.FC<BookshelfProviderProps> = ({ children }) => {
    const [bookshelves, setBookshelf] = useState<Bookshelf[]>(initialBookshelfContext.bookshelves);
    const { userId } = useParams<{ userId?: string }>();


    const fetchBookshelfData = async (userId: number) => {
        try {
            const response = await axios.get<Bookshelf[]>(`/api/bookshelves/user-id/${userId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                }); 
            setBookshelf(response.data);
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    };

    useEffect(() => {
        const currentUserId = GetCurrentUser()?.userId ?? -1;
        const maybeUserId = userId ? parseInt(userId) : undefined;
        fetchBookshelfData(maybeUserId ?? currentUserId);
    }, []);

    const refreshBookshelf = (userId: number) => {
        fetchBookshelfData(userId);
    };
    return (
        <BookshelfContext.Provider value={{ bookshelves, setBookshelf, refreshBookshelf }}>
            {children}
        </BookshelfContext.Provider>
    );
};
export default BookshelfContext;