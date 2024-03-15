import { Book } from "./Book";

export class FavBook {
    public favBookId: number;
    public userId: number;
    public book: Book;

    constructor(
        favBookId: number,
        userId: number,
        book: Book,
    ) {
        this.favBookId = favBookId;
        this.userId = userId;
        this.book = book;
    }
}