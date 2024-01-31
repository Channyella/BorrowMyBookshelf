namespace BorrowMyBookshelf.Server.Models.Books
{
    public class CreateBooks
    {
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public int? PageCount { get; set; }
        public DateTime CreateDate { get; set; }
        public string? ImageFileName { get; set; }
        public string? Description { get; set; }
        public int? AudioLength { get; set; }

        public CreateBooks()
        {
            Title = String.Empty;
            AuthorId = -1;
            PageCount = null;
            CreateDate = DateTime.Now;
            ImageFileName = null;
            Description = null;
            AudioLength = null;
        }

    }
}
