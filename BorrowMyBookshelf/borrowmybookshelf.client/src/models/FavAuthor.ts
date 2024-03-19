import { Author } from "./Author";

export class FavAuthor {
    public favAuthorId: number;
    public userId: number;
    public author: Author;

    constructor(favAuthor: FavAuthor) {
        this.favAuthorId = favAuthor.favAuthorId;
        this.userId = favAuthor.userId;
        this.author = new Author(favAuthor.author);
    }
}