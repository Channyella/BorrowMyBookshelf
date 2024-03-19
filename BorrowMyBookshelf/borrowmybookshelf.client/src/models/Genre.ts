export class Genre {
    public genreId: number;
    public genreType: string;

    constructor(genre : Genre) {
        this.genreId = genre.genreId;
        this.genreType = genre.genreType;
    }
}