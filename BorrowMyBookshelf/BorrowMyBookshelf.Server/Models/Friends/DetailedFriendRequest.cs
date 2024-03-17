namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class DetailedFriendRequest
    {
        public int FriendId { get; set; }
        public Users.Users RequesterUserInfo { get; set; }
        public Users.Users ReceiverUserInfo { get; set; }

        public bool Accepted { get; set; }
        public DateTime CreateDate { get; set; }

        public DetailedFriendRequest( int friendId, Users.Users requesterUserId, 
            Users.Users receiverUserInfo, bool accepeted, DateTime createDate)
        {
            FriendId = friendId;
            RequesterUserInfo = requesterUserId;
            ReceiverUserInfo = receiverUserInfo;
            Accepted = accepeted;
            CreateDate = createDate;
        }
    }
}
