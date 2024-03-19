namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class DetailedFriendRequest(int friendId, Users.Users requesterUserId,
        Users.Users receiverUserInfo, bool accepeted, DateTime createDate)
    {
        public int FriendId { get; set; } = friendId;
        public Users.Users RequesterUserInfo { get; set; } = requesterUserId;
        public Users.Users ReceiverUserInfo { get; set; } = receiverUserInfo;

        public bool Accepted { get; set; } = accepeted;
        public DateTime CreateDate { get; set; } = createDate;
    }
}
