import axios from 'axios';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Bookshelf } from '../models/Bookshelf';
import { GetAuthHeader } from '../models/AuthHelper';

interface BookshelfContextType {
    bookshelves: Bookshelf[],
    setBookshelf: React.Dispatch<React.SetStateAction<Bookshelf[]>>;
    refreshBookshelf: () => void;
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

    const fetchBookshelfData = async () => {
        try {
            const response = await axios.get<Bookshelf[]>('/api/bookshelves',
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
        fetchBookshelfData();
    }, []);

    const refreshBookshelf = () => {
        fetchBookshelfData();
    };
    return (
        <BookshelfContext.Provider value={{ bookshelves, setBookshelf, refreshBookshelf }}>
            {children}
        </BookshelfContext.Provider>
    );
};
export default BookshelfContext;