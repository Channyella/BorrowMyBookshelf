import { Book } from "./Book";
import { BookRequest, BookRequestStatus } from "./BookRequest";

export enum BookFormat {
    Hardcover = 1,
    Paperback = 2,
    eBook = 3,
    AudioBook = 4,
}
export class UserBook {
    public userBookId: number;
    public book: Book; // Book has itself, Author, and Genre[] 
    public borrowable: boolean;
    public bookRequest?: BookRequest;
    public bookFormat: BookFormat;
    public userId: number;

    constructor(
        userBookId: number,
        book: Book,
        borrowable: boolean,
        bookRequest: BookRequest,
        bookFormat: BookFormat,
        userId: number
    ) {
        this.userBookId = userBookId;
        this.book = book;
        this.borrowable = borrowable;
        this.bookRequest = bookRequest;
        this.bookFormat = bookFormat;
        this.userId = userId;
    }
}

export enum BorrowableStatus {
    NotBorrowable = "Not Borrowable",
    Available = "Available",
    Pending = "Pending...",
    Borrowed = "Borrowed",
    Accepted = "Accepted"
}

export const getBorrowableStatus = (userBook: UserBook) => {
    if (!userBook.borrowable) {
        return BorrowableStatus.NotBorrowable;
    }
    switch (userBook.bookRequest?.bookRequestStatus) {
        case BookRequestStatus.Pending: return BorrowableStatus.Pending;
        case BookRequestStatus.Accepted: return BorrowableStatus.Accepted;
        case BookRequestStatus.Borrowed: return BorrowableStatus.Borrowed;
        default: return BorrowableStatus.Available;
    }
}