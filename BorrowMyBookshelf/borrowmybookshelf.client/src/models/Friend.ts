import { User } from "./User";

export class Friend {
    public friendId: number;
    public friendUserInfo: User;
    public isRequester: boolean;
    public accepted: boolean;

    constructor(friend: Friend) {
        this.friendId = friend.friendId;
        this.friendUserInfo = friend.friendUserInfo;
        this.isRequester = friend.isRequester;
        this.accepted = friend.accepted;
    }
}