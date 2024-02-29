export class User {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public passwordHash: string;
    public notes: string | undefined;
    public imageFileName: string | undefined;
    public createDate: Date;
    public updatedDate: Date | undefined;

    constructor(
        userId: number,
        firstName: string,
        lastName: string,
        email: string,
        passwordHash: string,
        notes: string | undefined,
        imageFileName: string | undefined,
        createDate: Date,
        updatedDate: Date | undefined
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.notes = notes;
        this.imageFileName = imageFileName;
        this.createDate = createDate;
        this.updatedDate = updatedDate;


    }

}