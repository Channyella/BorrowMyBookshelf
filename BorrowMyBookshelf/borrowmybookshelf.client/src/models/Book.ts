export class Book {
    public bookId: number;
    public title: string;
    public authorId: number;
    public pageCount: number | undefined;
    public createDate: Date;
    public image_file_name: string | undefined;
    public description: string | undefined;
    public audioLength: number | undefined;

    constructor(
        bookId: number,
        title: string,
        authorId: number,
        pageCount: number | undefined,
        createDate: Date,
        image_file_name: string | undefined,
        description: string | undefined,
        audioLength: number | undefined,
    ) {
        this.bookId = bookId;
        this.title = title;
        this.authorId = authorId;
        this.pageCount = pageCount;
        this.createDate = createDate;
        this.image_file_name = image_file_name;
        this.description = description;
        this.audioLength = audioLength;
    }
}