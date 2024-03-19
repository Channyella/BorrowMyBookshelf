import { Book } from "./Book";

export class FavBook {
    public favBookId: number;
    public userId: number;
    public book: Book;

    constructor(favBook: FavBook) {
        this.favBookId = favBook.favBookId;
        this.userId = favBook.userId;
        this.book = new Book(favBook.book);
    }
}