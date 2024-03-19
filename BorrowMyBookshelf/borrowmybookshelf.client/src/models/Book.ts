import { Author } from "./Author";
import { Genre } from "./Genre";

export class Book {
    public bookId: number;
    public title: string;
    public author: Author;
    public pageCount: number | undefined;
    public createDate: Date;
    public image_file_name: string | undefined;
    public description: string | undefined;
    public audioLength: number | undefined;
    public genres: Genre[];

    constructor(book: Book) {
        this.bookId = book.bookId;
        this.title = book.title;
        this.author = new Author(book.author);
        this.pageCount = book.pageCount;
        this.createDate = book.createDate;
        this.image_file_name = book.image_file_name;
        this.description = book.description;
        this.audioLength = book.audioLength;
        this.genres = book.genres.map(genre => new Genre(genre));
    }
}