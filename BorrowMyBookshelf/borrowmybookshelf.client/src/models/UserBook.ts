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

    constructor(userBook: UserBook) {
        this.userBookId = userBook.userBookId;
        this.book = new Book(userBook.book);
        this.borrowable = userBook.borrowable;
        this.bookRequest = userBook.bookRequest ? new BookRequest(userBook.bookRequest) : undefined;
        this.bookFormat = userBook.bookFormat;
        this.userId = userBook.userId;
    }

    public getBorrowableStatus() {
        if (!this.borrowable) {
            return BorrowableStatus.NotBorrowable;
        }
        switch (this.bookRequest?.bookRequestStatus) {
            case BookRequestStatus.Pending: return BorrowableStatus.Pending;
            case BookRequestStatus.Accepted: return BorrowableStatus.Accepted;
            case BookRequestStatus.Borrowed: return BorrowableStatus.Borrowed;
            default: return BorrowableStatus.Available;
        }
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