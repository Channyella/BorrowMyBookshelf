export class BooksOnBookshelf {
    public bookshelfBookId: number;
    public bookshelfId: number;
    public userBookId: number;

    constructor(
        bookshelfBookId: number,
        bookshelfId: number,
        userBookId: number
    ) {
        this.bookshelfBookId = bookshelfBookId;
        this.bookshelfId = bookshelfId;
        this.userBookId = userBookId;
    }
}