namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class DetailedFriend(int friendId, Users.Users friendUserInfo, bool isRequester, bool accepted, DateTime createDate)
    {
        public int FriendId { get; set; } = friendId;
        public Users.Users FriendUserInfo { get; set; } = friendUserInfo;
        public bool IsRequester { get; set; } = isRequester;
        public bool Accepted { get; set; } = accepted;
        public DateTime CreateDate { get; set; } = createDate;
    }
}
