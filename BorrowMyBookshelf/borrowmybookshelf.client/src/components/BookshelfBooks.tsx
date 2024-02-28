import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bookshelf } from '../models/Bookshelf';

export default function BookshelfBooks() {
    const { bookshelfId } = useParams<{ bookshelfId: string }>() ?? "";
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);

    useEffect(() => {
        if (bookshelfId) {
            fetchBookshelf(bookshelfId);
        }
    }, [bookshelfId]);

    const fetchBookshelf = async (id: string) => {
        try {
            const response = await fetch(`/api/bookshelves/${id}`);
            const data = await response.json();
            setBookshelf(data);
        } catch (error) {
            console.error('Error fetching bookshelf data:', error);
        }
    }
    return (
        <div>
            <h2>{bookshelf?.bookshelfName}</h2>
            <p>Bookshelf ID: {bookshelfId}</p>
            {/* Add more book details here */}
        </div>
    );
}