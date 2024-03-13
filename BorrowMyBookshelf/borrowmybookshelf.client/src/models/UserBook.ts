import { Book } from "./Book";

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
    public bookFormat: BookFormat;
    public userId: number;

    constructor(
        userBookId: number,
        book: Book,
        borrowable: boolean,
        bookFormat: BookFormat,
        userId: number
    ) {
        this.userBookId = userBookId;
        this.book = book;
        this.borrowable = borrowable;
        this.bookFormat = bookFormat;
        this.userId = userId;
    }
}