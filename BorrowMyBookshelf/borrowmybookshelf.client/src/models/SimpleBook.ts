export class SimpleBook {
    public bookId: number;
    public title: string;
    public authorId: number;
    public pageCount: number | undefined;
    public createDate: Date;
    public image_file_name: string | undefined;
    public description: string | undefined;
    public audioLength: number | undefined;

    constructor(book: SimpleBook) {
        this.bookId = book.bookId;
        this.title = book.title;
        this.authorId = book.authorId;
        this.pageCount = book.pageCount;
        this.createDate = book.createDate;
        this.image_file_name = book.image_file_name;
        this.description = book.description;
        this.audioLength = book.audioLength;

    }
}