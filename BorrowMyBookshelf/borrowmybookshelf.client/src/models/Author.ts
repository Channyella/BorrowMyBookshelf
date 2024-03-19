export class Author {
    public authorId: number;
    public firstName: string;
    public middleName: string | undefined;
    public lastName: string;

    constructor(author: Author) {
        this.authorId = author.authorId;
        this.firstName = author.firstName;
        this.middleName = author.middleName;
        this.lastName = author.lastName;
    }
}

export const getAuthorFullName = (author: Author) => {
    return `${author.firstName} ${author.middleName ?? ""} ${author.lastName}`;
}
