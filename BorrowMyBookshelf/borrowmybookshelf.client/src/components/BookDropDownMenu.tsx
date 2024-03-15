import React, { useContext, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import axios from 'axios';
import { GetAuthHeader } from '../helpers/AuthHelper';
import BookDeleteCustomAlert from './BookDeleteCustomAlert';
import { Link, useNavigate } from 'react-router-dom';
import { UserBook } from '../models/UserBook';

interface BookDropDownMenuProps {
    bookId?: number;
    userBookId?: number;
    bookshelfBookId?: number;
    hideDeleteOption?: boolean;
    showUserBooksDeleteOption?: boolean;
    refreshShelf: () => Promise<void>;
    hideEditOption?: boolean;
    onlyBookId?: boolean;
}

const BookDropDownMenu: React.FC<BookDropDownMenuProps> = ({ bookId, userBookId, bookshelfBookId, hideDeleteOption, showUserBooksDeleteOption, refreshShelf, hideEditOption, onlyBookId }) => {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    // Delete book from BookshelfBooks (delete from specific shelf)
    const deleteBook = async (bookshelfBookId: number) => {
        try {
            await axios.delete(`/api/bookshelfBooks/${bookshelfBookId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            return true;
        } catch (error) {
            console.error('Error deleting book from bookshelf:', error);
            return false;
        }
    };

    const handleConfirm = async () => {
        setShowModal(false);
        if (bookshelfBookId) {
            const isDeleted = await deleteBook(bookshelfBookId);
            if (isDeleted) {
                await refreshShelf();
            }
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const confirmDelete = () => {
        setShowModal(true);
    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    // Delete book from userBooks (not on user anymore)
    const deleteUserBook = async (userBookId: number) => {
        try {
            await axios.delete(`/api/userBooks/${userBookId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            return true;
        } catch (error) {
            console.error('Error deleting book from bookshelf:', error);
            setShowAlert(true);
            return false;
        }
    };


    const updateUserBook = async () => {
        if (userBookId) {
            navigate(`/update-book/${userBookId}`);
        }
    };

    const handleConfirmUserBook = async () => {
        setShowModal(false);
        if (userBookId) {
            const isDeleted = await deleteUserBook(userBookId);
            if (isDeleted) {
                await refreshShelf();
            }
        }
    };

    return (
        <div className="flex flex-col book-dropdown">
            <div className="flex flex-col gap-4 drop-down-btn-container">
                <div>
                    <Link to={`/view-books/${bookId}`}>
                    <button className="btn btn-warning">View Details</button>
                    </Link>
                </div>
                {bookId && onlyBookId &&
                    (<div>
                    <Link to={`/add-to-bookshelf/books/${bookId}`}>

                        <button className="btn btn-warning">Add to Bookshelf</button>
                        </Link>
                    </div>)}
                {bookId && userBookId &&
                    (<div>
                    <Link to={`/add-to-bookshelf/user-books/${userBookId}`}>
                        <button className="btn btn-warning">Add to Bookshelf</button>
                    </Link>
                </div>)}
                {!hideEditOption &&
                    (<div>
                        <button onClick={updateUserBook} className="btn btn-warning">Edit Book</button>
                    </div>)}
                {bookshelfBookId && !hideDeleteOption &&
                    (<div>
                    <button onClick={confirmDelete} className="btn btn-warning" >Remove Book From Bookshelf</button>
                        {showModal && (
                            <ConfirmModal
                                message="Are you sure you want to delete this book?"
                                onConfirm={handleConfirm}
                                onCancel={handleCancel}/>
                    )}
                    </div>)}
                {showUserBooksDeleteOption && userBookId &&
                    (<div>
                        <button onClick={confirmDelete} className="btn btn-warning" >Delete Book</button>
                        {showModal && (
                            <ConfirmModal
                                message="Are you sure you want to delete this book?"
                                onConfirm={handleConfirmUserBook}
                                onCancel={handleCancel}/>
                    )}
                    </div>)
                }
            </div>
            {
                showAlert && (
                    <BookDeleteCustomAlert
                        message="Please delete this book on bookshelves before removing it from all books."
                        onClose={handleAlertClose}
                    />
                )
            }
        </div>
    )
}

export default BookDropDownMenu