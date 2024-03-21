import { ReviewBookFormat } from "./Review";

export class SimpleReview {
    public reviewId: number;
    public userId: number;
    public bookId: number;
    public bookFormat: ReviewBookFormat;
    public summary: string;
    public rating: number;
    public startDate?: Date;
    public finishedDate?: Date;
    public createDate: Date;
    public updatedDate?: Date;

    constructor(review: SimpleReview) {
        this.reviewId = review.reviewId;
        this.userId = review.userId;
        this.bookId = review.bookId;
        this.bookFormat = review.bookFormat;
        this.summary = review.summary;
        this.rating = review.rating;
        this.startDate = review.startDate ? new Date(review.startDate) : undefined;
        this.finishedDate = review.finishedDate ? new Date(review.finishedDate) : undefined;
        this.createDate = new Date(review.createDate);
        this.updatedDate = review.updatedDate ? new Date(review.updatedDate) : undefined;
    }

    public getBookFormatString(): string {
        switch (this.bookFormat) {
            case ReviewBookFormat.Physical:
                return "physical";
            case ReviewBookFormat.eBook:
                return "eBook";
            case ReviewBookFormat.AudioBook:
                return "audio book";
            default:
                return "unknown";
        }
    }
}