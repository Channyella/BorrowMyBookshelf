export class Genre {
    public genreId: number;
    public genreType: string;

    constructor(
        genreId: number,
        genreType: string
    ) {
        this.genreId = genreId;
        this.genreType = genreType;
    }
}