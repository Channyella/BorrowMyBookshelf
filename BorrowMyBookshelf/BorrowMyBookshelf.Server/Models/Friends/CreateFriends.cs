namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class CreateFriends
    {
        public int RequesterUserId { get; set; }
        public int RecieverUserId { get; set; }
        public bool Accepted { get; set; }
        public DateTime CreateDate { get; set; }
        public void CreateFriend()
        {
            RequesterUserId = -1;
            RecieverUserId = -1;
            Accepted = false;
            CreateDate = DateTime.Now;
        }
    }
}
