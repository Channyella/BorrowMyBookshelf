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

    constructor(
        bookId: number,
        title: string,
        author: Author,
        pageCount: number | undefined,
        createDate: Date,
        image_file_name: string | undefined,
        description: string | undefined,
        audioLength: number | undefined,
        genres: Genre[]
    ) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.createDate = createDate;
        this.image_file_name = image_file_name;
        this.description = description;
        this.audioLength = audioLength;
        this.genres = genres;
    }
}