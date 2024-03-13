import { UserBook } from "./UserBook";

export enum BookRequestStatus {
    Pending = 1,
    Accepted = 2,
    Denied = 3,
    Borrowed = 4,
    Returned = 5,
}

export class BookRequest {
    public bookRequestId: number;
    public userBook: UserBook; // UserBook has itself, Book, Author, and Genre[]
    public requestDate: Date;
    public bookRequestStatus: BookRequestStatus;
    public dueDate: Date;
    public borrowerUserId: number;

    constructor(
        bookRequestId: number,
        userBook: UserBook,
        requestDate: Date,
        bookRequestStatus: BookRequestStatus,
        dueDate: Date,
        borrowerUserId: number
    ) {
        this.bookRequestId = bookRequestId;
        this.userBook = userBook;
        this.requestDate = requestDate;
        this.bookRequestStatus = bookRequestStatus;
        this.dueDate = dueDate;
        this.borrowerUserId = borrowerUserId;
    }
}