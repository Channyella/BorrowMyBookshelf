import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Bookshelf } from '../models/Bookshelf';
import axios from 'axios';
import { GetAuthHeader } from '../helpers/AuthHelper';
import BookshelfContext from '../context/BookshelfContext';
import ConfirmModal from './ConfirmModal';

export default function BookshelfBooks() {
    const { bookshelfId } = useParams<{ bookshelfId: string }>() ?? "";
    const [bookshelf, setBookshelf] = useState<Bookshelf | null>(null);
    const [showModal, setShowModal] = useState(false);
    const { refreshBookshelf } = useContext(BookshelfContext);
    const navigate = useNavigate();

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

    const deleteBookshelf = async (bookshelfId: string) => {
        try {
            await axios.delete(`/api/bookshelves/${bookshelfId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            return true;
        } catch (error) {
            console.error('Error deleting bookshelf:', error);
            return false;
        }
    };

    const handleConfirm = async () => {
        setShowModal(false);
        if (bookshelfId) {
            const isDeleted = await deleteBookshelf(bookshelfId);
            if (isDeleted) {
                await refreshBookshelf();
                navigate(`/`);
            }
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const confirmDelete = () => {
        setShowModal(true);
    };

    return (
        <div className = "wrapper">
            <nav className="navbar navbar-expand orange-bg navbar-fixed-top mini-nav">
                <div className="container-fluid">
                    <h2 className="navbar-header ms-3">{bookshelf?.bookshelfName}</h2>
                    <div className="nav navbar-nav navbar-right">
                        <Link to={`/update-bookshelf/${bookshelfId}`}>
                            <button className="btn btn-success nav-item ms-3"> Change Name </button>
                        </Link>
                        <button onClick={confirmDelete} className = "btn btn-success nav-item ms-3">Delete Bookshelf</button>
                        </div>
                </div>
            </nav>
            <main className="bookshelf-main">
            <p>Bookshelf ID: {bookshelfId}</p>
                {/* Add more book details here */}
            </main>
            <footer className="footer teal-bg text-light">
                <Link to={`/add-book/${bookshelfId}`}>
                    <button className="btn btn-success mr-3">Add Book</button>
                </Link>
            </footer>
            {showModal && (
                <ConfirmModal
                    message="Are you sure you want to delete this bookshelf?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}