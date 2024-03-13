import { Author } from "./Author";

export class FavAuthor {
    public favAuthorId: number;
    public userId: number;
    public author: Author;

    constructor(
        favAuthorId: number,
        userId: number,
        author: Author,
    ) {
        this.favAuthorId = favAuthorId;
        this.userId = userId;
        this.author = author;
    }
}