namespace BorrowMyBookshelf.Server.Models.Tags
{
    public class CreateTag
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public CreateTag()
        {
            UserId = -1;
            Title = string.Empty;
        }
    }
}
