import { Genre } from "./Genre";

export class FavGenre {
    public favGenreId: number;
    public userId: number;
    public genre: Genre;

    constructor(favGenre: FavGenre) {
        this.favGenreId = favGenre.favGenreId;
        this.userId = favGenre.userId;
        this.genre = new Genre(favGenre.genre);
    }
}