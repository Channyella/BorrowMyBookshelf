import { User } from "./User";
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
    public userBookId: number; // UserBook has itself, Book, Author, and Genre[]
    public requestDate: Date;
    public bookRequestStatus: BookRequestStatus;
    public dueDate?: Date;
    public borrowerUser: User;

    constructor(bookRequest: BookRequest) {
        this.bookRequestId = bookRequest.bookRequestId;
        this.userBookId = bookRequest.userBookId;
        this.requestDate = new Date(bookRequest.requestDate);
        this.bookRequestStatus = bookRequest.bookRequestStatus;
        this.dueDate = bookRequest.dueDate;
        this.borrowerUser = new User(bookRequest.borrowerUser);
    }
}