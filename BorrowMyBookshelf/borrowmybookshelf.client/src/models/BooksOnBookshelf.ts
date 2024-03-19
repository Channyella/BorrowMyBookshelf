import { UserBook } from "./UserBook";

export class BooksOnBookshelf {
    public bookshelfBookId: number;
    public bookshelfId: number;
    public userBook: UserBook;

    constructor(booksOnBookshelf: BooksOnBookshelf) {
        this.bookshelfBookId = booksOnBookshelf.bookshelfBookId;
        this.bookshelfId = booksOnBookshelf.bookshelfId;
        this.userBook = new UserBook(booksOnBookshelf.userBook);
    }
}