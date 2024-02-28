export class Bookshelf {
    public bookshelfId: number;
    public bookshelfName: string;
    public userId: number;

    constructor(
        bookshelfId: number,
        bookshelfName: string,
        userId: number,
    ) {
        this.bookshelfId = bookshelfId;
        this.bookshelfName = bookshelfName;
        this.userId = userId;
    }
}