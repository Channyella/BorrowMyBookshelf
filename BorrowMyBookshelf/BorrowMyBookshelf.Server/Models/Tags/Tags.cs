namespace BorrowMyBookshelf.Server.Models.Tags
{
    public class Tags
    {
        public int TagId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public Tags(int tagId, int userId, string title)
        {
            TagId = tagId;
            UserId = userId;
            Title = title;
        }   
    }
}
