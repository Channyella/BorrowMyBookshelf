import axios from 'axios';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import { BooksOnBookshelf } from '../models/BooksOnBookshelf';
import { Bookshelf } from '../models/Bookshelf';
import { useParams } from 'react-router-dom';


interface BookshelfBooksContextType {
    bookshelfBooks: BooksOnBookshelf[],
    setBookshelfBooks: React.Dispatch<React.SetStateAction<BooksOnBookshelf[]>>;
    refreshBookshelfBooks: (bookshelfId: number, userId: number) => void;
}

const initialBookshelfBooksContext: BookshelfBooksContextType = {
    bookshelfBooks: [],
    setBookshelfBooks: () => { },
    refreshBookshelfBooks: () => { },
};

const BookshelfBooksContext = createContext<BookshelfBooksContextType>(initialBookshelfBooksContext);

interface BookshelfBooksProviderProps {
    children: ReactNode;
}

export const BookshelfBooksProvider: React.FC<BookshelfBooksProviderProps> = ({ children }) => {
    const { bookshelfId } = useParams<{ bookshelfId: string }>() ?? "";
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);

    const [bookshelfBooks, setBookshelfBooks] = useState<BooksOnBookshelf[]>(initialBookshelfBooksContext.bookshelfBooks);

    const fetchBookshelf = async (id: string) => {
        try {
            const response = await axios.get<Bookshelf>(`/api/bookshelves/${id}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setBookshelf(response.data);
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    }

    useEffect(() => {
        if (bookshelfId) {
            fetchBookshelf(bookshelfId);
        }
    }, [bookshelfId]);

    const fetchBookshelfBooksData = async (bookshelfId: number, userId: number) => {
        try {
            const response = await axios.get<BooksOnBookshelf[]>(`/api/bookshelves/user-id/${userId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            setBookshelfBooks(response.data);
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    };

    useEffect(() => {
        const userId = GetCurrentUser()?.userId ?? -1;
        fetchBookshelfBooksData(Number(bookshelfId), userId);
    }, [bookshelfId]);

    const refreshBookshelfBooks = (bookshelfId: number, userId: number) => {
        fetchBookshelfBooksData(bookshelfId, userId);
    };
    return (
        <BookshelfBooksContext.Provider value={{ bookshelfBooks, setBookshelfBooks, refreshBookshelfBooks }}>
            {children}
        </BookshelfBooksContext.Provider>
    );
};
export default BookshelfBooksContext;