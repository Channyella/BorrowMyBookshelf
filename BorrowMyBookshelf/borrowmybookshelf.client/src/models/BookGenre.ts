export class BookGenre {
    public bookGenreId: number;
    public bookId: number;
    public genreId: number;

    constructor(
        bookGenreId: number,
        bookId: number,
        genreId: number
    ) {
        this.bookGenreId= bookGenreId;
        this.bookId = bookId;
        this.genreId = genreId;
    }
}