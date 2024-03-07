import React, { useContext, useState } from 'react';
import ConfirmModal from './ConfirmModal';
import axios from 'axios';
import { GetAuthHeader } from '../helpers/AuthHelper';
import BookDeleteCustomAlert from './BookDeleteCustomAlert';

interface BookDropDownMenuProps {
    bookId?: number;
    userBookId?: number;
    bookshelfBookId?: number;
    hideDeleteOption?: boolean;
    showUserBooksDeleteOption?: boolean;
    refreshShelf: () => Promise<void>;
}

const BookDropDownMenu: React.FC<BookDropDownMenuProps> = ({ bookId, userBookId, bookshelfBookId, hideDeleteOption, showUserBooksDeleteOption, refreshShelf }) => {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

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

    const handleButtonClick = () => {
        setShowAlert(true);
    };

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
                    <button className="btn btn-warning">View Details</button>
                </div>
                <div>
                    <button className="btn btn-warning">Edit Book</button>
                </div>
                {bookshelfBookId && !hideDeleteOption &&
                    (<div>
                    <button onClick={confirmDelete} className="btn btn-warning" >Delete Book</button>
                        {showModal && (
                            <ConfirmModal
                                message="Are you sure you want to delete this book?"
                                onConfirm={handleConfirm}
                                onCancel={handleCancel}
                            />
                    )}

                    </div>)
                }
                {showUserBooksDeleteOption && userBookId &&
                    (<div>
                        <button onClick={confirmDelete} className="btn btn-warning" >Delete Book</button>
                        {showModal && (
                            <ConfirmModal
                                message="Are you sure you want to delete this book?"
                                onConfirm={handleConfirmUserBook}
                                onCancel={handleCancel}
                            />
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