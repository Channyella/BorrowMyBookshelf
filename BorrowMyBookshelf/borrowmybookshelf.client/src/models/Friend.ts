import { User } from "./User";

export class Friend {
    public friendId: number;
    public friendUserInfo: User;
    public isRequester: boolean;
    public accepted: boolean;

    constructor(
        friendId: number,
        friendUserInfo: User,
        isRequester: boolean,
        accepted: boolean,
    ) {
        this.friendId = friendId;
        this.friendUserInfo = friendUserInfo;
        this.isRequester = isRequester;
        this.accepted = accepted;
    }
}