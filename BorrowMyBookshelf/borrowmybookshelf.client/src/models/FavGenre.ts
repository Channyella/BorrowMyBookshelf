import { Genre } from "./Genre";

export class FavGenre {
    public favGenreId: number;
    public userId: number;
    public genre: Genre;

    constructor(
        favGenreId: number,
        userId: number,
        genre: Genre,
    ) {
        this.favGenreId = favGenreId;
        this.userId = userId;
        this.genre = genre;
    }
}