import { Book } from "./Book";
import { BookRequest, BookRequestStatus } from "./BookRequest";

export enum BookFormat {
    Hardcover = 1,
    Paperback = 2,
    eBook = 3,
    AudioBook = 4,
}
export abstract class UserBook {
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

    public abstract getLength(): string;

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

export class AudioUserBook extends UserBook {
    constructor(userBook: UserBook) {
        super(userBook);
    }
    public override getLength(): string {
        if (!this.book.audioLength) return "";
        const hours = Math.floor(this.book.audioLength / 60);
        const minutes = this.book.audioLength % 60;
        return `${hours}h ${minutes}m`;
    }
}

export class PagedUserBook extends UserBook {
    constructor(userBook: UserBook) {
        super(userBook);
    }
    public override getLength(): string {
        if (!this.book.pageCount) return "";
        return `${this.book.pageCount} pages`;
    }
}

export const makeUserBook = (userBook: UserBook): UserBook => {
    switch (userBook.bookFormat) {
        case BookFormat.AudioBook: return new AudioUserBook(userBook);
        case BookFormat.eBook:
        case BookFormat.Hardcover:
        case BookFormat.Paperback: return new PagedUserBook(userBook);
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