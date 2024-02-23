namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class UpdateFriends
    {
        public int? RequesterUserId { get; set; }
        public int? RecieverUserId { get; set; }
        public bool? Accepted { get; set; }
        public DateTime? CreateDate { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateFriends()
        {
            RequesterUserId = null;
            RecieverUserId = null;
            Accepted = null;
            CreateDate = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
