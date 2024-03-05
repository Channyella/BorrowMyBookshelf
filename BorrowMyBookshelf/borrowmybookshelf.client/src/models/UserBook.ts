
export enum BookFormat {
    Hardcover = 1,
    Paperback = 2,
    eBook = 3,
    AudioBook = 4,
}
export class UserBook {
    public userBookId: number;
    public bookId: number;
    public borrowable: boolean;
    public bookFormat: BookFormat;
    public userId: number;

    constructor(
        userBookId: number,
        bookId: number,
        borrowable: boolean,
        bookFormat: BookFormat,
        userId: number
    ) {
        this.userBookId = userBookId;
        this.bookId = bookId;
        this.borrowable = borrowable;
        this.bookFormat = bookFormat;
        this.userId = userId;
    }
}