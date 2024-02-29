export class Tags {
    public tagId: number;
    public userId: number;
    public title: string;

    constructor(
        tagId: number,
        userId: number,
        title: string,
    ) {
        this.tagId = tagId;
        this.userId = userId;
        this.title = title;
    }
}