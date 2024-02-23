namespace BorrowMyBookshelf.Server.Models.Books
{
    public class UpdateBooks
    {
        public string? Title { get; set; }
        public int? AuthorId { get; set; }
        public int? PageCount { get; set; }
        public DateTime? CreateDate { get; set; }
        public string? ImageFileName { get; set; }
        public string? Description { get; set; }
        public int? AudioLength { get; set; }
        public string ColumnsToNullify { get; set; }

        public UpdateBooks()
        {
            Title = null;
            AuthorId = null;
            PageCount = null;
            CreateDate = null;
            ImageFileName = null;
            Description = null;
            AudioLength = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
