namespace BorrowMyBookshelf.Server.Models.Books
{
    public class Books
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public int? PageCount { get; set; }
        public DateTime CreateDate { get; set; }
        public string? ImageFileName { get; set; }
        public string? Description { get; set; }
        public int ?AudioLength { get; set; }
        public Books(int bookId, string title, int authorId, int? pageCount, DateTime createDate, string? imageFileName, string? description, int? audioLength)
        {
            BookId = bookId;
            Title = title;
            AuthorId = authorId;
            PageCount = pageCount;
            CreateDate = createDate;
            ImageFileName = imageFileName;
            Description = description;
            AudioLength = audioLength;
        }

        
     

    }
}
