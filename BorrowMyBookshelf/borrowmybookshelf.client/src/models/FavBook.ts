import { SimpleBook } from "./SimpleBook";

export class FavBook {
    public favBookId: number;
    public userId: number;
    public book: SimpleBook;

    constructor(favBook: FavBook) {
        this.favBookId = favBook.favBookId;
        this.userId = favBook.userId;
        this.book = new SimpleBook(favBook.book);
    }
}