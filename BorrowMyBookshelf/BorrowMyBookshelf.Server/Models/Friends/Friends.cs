using MySql.Data.MySqlClient;
using System.Data;

namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class Friends
    {
        public int FriendId { get; set; }
        public int RequesterUserId { get; set; }
        public int RecieverUserId { get; set; }
        public bool Accepted { get; set; }
        public DateTime CreateDate { get; set; }

        public Friends(int friendId, int requesterUserId, int recieverUserId, bool accepted, DateTime createDate)
        {
            FriendId = friendId;
            RequesterUserId = requesterUserId;
            RecieverUserId = recieverUserId;
            Accepted = accepted;
            CreateDate = createDate;
        }
    }
}
