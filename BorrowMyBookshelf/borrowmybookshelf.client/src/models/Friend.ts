export class Friend {
    public friendId: number;
    public requesterUserId: number;
    public recieverUserId: number;
    public accepted: boolean;

    constructor(
        friendId: number,
        requesterUserId: number,
        recieverUserId: number,
        accepted: boolean,
    ) {
        this.friendId = friendId;
        this.requesterUserId = requesterUserId;
        this.recieverUserId = recieverUserId;
        this.accepted = accepted;
    }
}