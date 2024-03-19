export class Tags {
    public tagId: number;
    public userId: number;
    public title: string;

    constructor(tag: Tags) {
        this.tagId = tag.tagId;
        this.userId = tag.userId;
        this.title = tag.title;
    }
}