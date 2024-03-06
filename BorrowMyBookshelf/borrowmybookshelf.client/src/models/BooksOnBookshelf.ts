import { UserBook } from "./UserBook";

export class BooksOnBookshelf {
    public bookshelfBookId: number;
    public bookshelfId: number;
    public userBook: UserBook;

    constructor(
        bookshelfBookId: number,
        bookshelfId: number,
        userBook: UserBook,
    ) {
        this.bookshelfBookId = bookshelfBookId;
        this.bookshelfId = bookshelfId;
        this.userBook = userBook;
    }
}