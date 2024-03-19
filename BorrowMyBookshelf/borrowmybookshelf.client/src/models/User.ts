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

    constructor(user: User) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.passwordHash = user.passwordHash;
        this.notes = user.notes;
        this.imageFileName = user.imageFileName;
        this.createDate = user.createDate;
        this.updatedDate = user.updatedDate;
    }

    public getFullName() {
        return this.firstName + " " + this.lastName;
    }
}