namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class DetailedFriend
    {
        public int FriendId { get; set; }
        public Users.Users FriendUserInfo { get; set; }
        public bool IsRequester { get; set; }
        public bool Accepted { get; set; }
        public DateTime CreateDate { get; set; }

        public DetailedFriend(int friendId, Users.Users friendUserInfo, bool isRequester, bool accepted, DateTime createDate)
        {
            FriendId = friendId;
            FriendUserInfo = friendUserInfo;
            IsRequester = isRequester;
            Accepted = accepted;
            CreateDate = createDate;
        }
    }
}
