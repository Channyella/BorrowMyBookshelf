export class BookGenre {
    public bookGenreId: number;
    public bookId: number;
    public genreId: number;

    constructor(bookGenre: BookGenre) {
        this.bookGenreId= bookGenre.bookGenreId;
        this.bookId = bookGenre.bookId;
        this.genreId = bookGenre.genreId;
    }
}