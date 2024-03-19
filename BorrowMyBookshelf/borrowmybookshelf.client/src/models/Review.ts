import { SimpleBook } from "./SimpleBook";
import { User } from "./User";


export enum ReviewBookFormat {
    Physical = 1,
    eBook = 2,
    AudioBook = 3,
}
export class Review {
    public reviewId: number;
    public user: User;
    public book: SimpleBook;
    public bookFormat: ReviewBookFormat;
    public summary: string;
    public rating: number;
    public startDate: Date;
    public finishedDate: Date;
    public createDate: Date;
    public updatedDate: Date;

    constructor(review: Review) {
        this.reviewId = review.reviewId;
        this.user = new User(review.user);
        this.book = new SimpleBook(review.book);
        this.bookFormat = review.bookFormat;
        this.summary = review.summary;
        this.rating = review.rating;
        this.startDate = review.startDate;
        this.finishedDate = review.finishedDate;
        this.createDate = review.createDate;
        this.updatedDate = review.updatedDate;
    }
}