namespace BorrowMyBookshelf.Server.Models.Friends
{
    public class UpdateFriends
    {
        public bool? Accepted { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateFriends()
        {
            Accepted = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
