import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import axios from 'axios';
import { GetAuthHeader, GetCurrentUser } from '../helpers/AuthHelper';
import BookDeleteCustomAlert from './BookDeleteCustomAlert';
import { Link, useNavigate } from 'react-router-dom';
import { UserBook } from '../models/UserBook';
import ModalButton, { ModalType } from './ModalButton';
import { Post, Put } from '../helpers/NetworkHelper';
import { BookRequestStatus } from '../models/BookRequest';

interface BookDropDownMenuProps {
    bookId?: number;
    userBook?: UserBook;
    userBookId?: number;
    bookshelfBookId?: number;
    hideDeleteOption?: boolean;
    showUserBooksDeleteOption?: boolean;
    refreshShelf: () => Promise<unknown>;
    hideEditOption?: boolean;
    onlyBookId?: boolean;
    hideAddToBookshelf?: boolean;
    showDropDown: ((id: number) => void);
}

const BookDropDownMenu: React.FC<BookDropDownMenuProps> = ({ bookId, userBookId, bookshelfBookId, hideDeleteOption, showUserBooksDeleteOption, refreshShelf, hideEditOption, onlyBookId, hideAddToBookshelf, userBook, showDropDown }) => {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const isCurrentUser = !!userBook && userBook.userId === GetCurrentUser()?.userId;

    // Delete book from BookshelfBooks (delete from specific shelf)
    const deleteBook = async (bookshelfBookId: number) => {
        try {
            await axios.delete(`/api/bookshelfBooks/${bookshelfBookId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            showDropDown(-1);
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
            showDropDown(-1);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        showDropDown(-1);
    };

    const confirmDelete = () => {
        setShowModal(true);
    };

    const handleAlertClose = () => {
        setShowAlert(false);
        showDropDown(-1);
    };

    // Delete book from userBooks (not on user anymore)
    const deleteUserBook = async (userBookId: number) => {
        try {
            await axios.delete(`/api/userBooks/${userBookId}`,
                {
                    withCredentials: true,
                    headers: GetAuthHeader(),
                });
            showDropDown(-1);
            return true;
        } catch (error) {
            console.error('Error deleting book from bookshelf:', error);
            setShowAlert(true);
            return false;
        }
    };


    const updateUserBook = async () => {
        if (userBookId) {
            showDropDown(-1);
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
            showDropDown(-1);
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
                {bookId && userBookId && !hideAddToBookshelf &&
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
                {!isCurrentUser && userBook && userBook.bookRequest?.borrowerUser.userId != GetCurrentUser()?.userId && userBook.borrowable &&
                    (<ModalButton buttonText="Request Book"
                        modalType={ModalType.ConfirmModal}
                        message={`Are you sure you want to borrow ${userBook.book.title}?`}
                    onConfirm={async () => {
                        await Post(`/api/bookRequests`, {
                            userBookId: userBook.userBookId,
                            borrowerUserId: GetCurrentUser()?.userId
                        });
                        await refreshShelf();
                        showDropDown(-1);
                    } }
                    ></ModalButton>)}
                {isCurrentUser && userBook && userBook.userId === GetCurrentUser()?.userId && userBook.bookRequest?.bookRequestStatus === BookRequestStatus.Pending &&
                    (<ModalButton buttonText="Handle Request"
                    modalType={ModalType.ConfirmModal}
                    message={`Accept borrow request for ${userBook.book.title} from ${userBook.bookRequest.borrowerUser.firstName} ${userBook.bookRequest.borrowerUser.lastName}?`}
                    onConfirm={async () => {
                        await Put(`/api/bookRequests/${userBook.bookRequest?.bookRequestId}`, {
                            bookRequestStatus: BookRequestStatus.Accepted
                        });
                        await refreshShelf();
                        showDropDown(-1);
                    }}
                    onCancel={async () => {
                        await Put(`/api/bookRequests/${userBook.bookRequest?.bookRequestId}`, {
                            bookRequestStatus: BookRequestStatus.Denied
                        });
                        await refreshShelf();
                        showDropDown(-1);
                    }}
                        cancelText="Deny"
                        confirmText="Accept"
                    ></ModalButton>)}

                {isCurrentUser && userBook && userBook.userId === GetCurrentUser()?.userId && userBook.bookRequest?.bookRequestStatus === BookRequestStatus.Accepted &&
                    (<ModalButton buttonText="Lend Book"
                        modalType={ModalType.ConfirmModal}
                        message={`Have you given ${userBook.book.title} to ${userBook.bookRequest.borrowerUser.firstName} ${userBook.bookRequest.borrowerUser.lastName}?`}
                        onConfirm={async () => {
                            await Put(`/api/bookRequests/${userBook.bookRequest?.bookRequestId}`, {
                                bookRequestStatus: BookRequestStatus.Borrowed
                            });
                            await refreshShelf();
                            showDropDown(-1);
                        }}
                    ></ModalButton>)}

                {isCurrentUser && userBook && userBook.userId === GetCurrentUser()?.userId && userBook.bookRequest?.bookRequestStatus === BookRequestStatus.Borrowed &&
                    (<ModalButton buttonText="Mark as Returned"
                        modalType={ModalType.ConfirmModal}
                        message={`Have you gotten ${userBook.book.title} back from ${userBook.bookRequest.borrowerUser.firstName} ${userBook.bookRequest.borrowerUser.lastName}?`}
                        onConfirm={async () => {
                            await Put(`/api/bookRequests/${userBook.bookRequest?.bookRequestId}`, {
                                bookRequestStatus: BookRequestStatus.Returned
                            });
                            await refreshShelf();
                            showDropDown(-1);
                        }}
                    ></ModalButton>)}
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