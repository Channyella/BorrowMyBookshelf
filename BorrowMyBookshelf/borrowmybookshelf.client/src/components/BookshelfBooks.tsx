import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bookshelf } from '../models/Bookshelf';
import axios from 'axios';
import { GetAuthHeader } from '../models/AuthHelper';

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
    return (
        <div>
            <h2>{bookshelf?.bookshelfName}</h2>
            <p>Bookshelf ID: {bookshelfId}</p>
            {/* Add more book details here */}
        </div>
    );
}