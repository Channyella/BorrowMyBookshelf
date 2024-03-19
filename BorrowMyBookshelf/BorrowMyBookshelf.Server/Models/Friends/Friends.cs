using MySql.Data.MySqlClient;
using System.Data;

namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class Friends(int friendId, int requesterUserId, int recieverUserId, bool accepted, DateTime createDate)
    {
        public int FriendId { get; set; } = friendId;
        public int RequesterUserId { get; set; } = requesterUserId;
        public int RecieverUserId { get; set; } = recieverUserId;
        public bool Accepted { get; set; } = accepted;
        public DateTime CreateDate { get; set; } = createDate;
    }
}
