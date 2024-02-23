namespace BorrowMyBookshelf.Server.Models.Tags
{
    public class UpdateTags
    {
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateTags()
        {
            UserId = null;
            Title = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
