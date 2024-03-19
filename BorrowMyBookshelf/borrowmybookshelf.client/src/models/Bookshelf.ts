export class Bookshelf {
    public bookshelfId: number;
    public bookshelfName: string;
    public userId: number;

    // take essentially an interface pretending to be a Bookshelf, and turn it into 
    // an actual Bookshelf object
    constructor(bookshelf: Bookshelf) {
        this.bookshelfId = bookshelf.bookshelfId;
        this.bookshelfName = bookshelf.bookshelfName;
        this.userId = bookshelf.userId;
    }
}