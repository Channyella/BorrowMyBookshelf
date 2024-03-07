export class Author {
    public authorId: number;
    public firstName: string;
    public middleName: string | undefined;
    public lastName: string;

    constructor(
        authorId: number,
        firstName: string,
        middleName: string | undefined,
        lastName: string
    ) {
        this.authorId = authorId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }
}

export const getAuthorFullName = (author: Author) => {
    return `${author.firstName} ${author.middleName ?? ""} ${author.lastName}`;
}
