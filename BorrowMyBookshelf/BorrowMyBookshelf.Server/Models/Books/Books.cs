namespace BorrowMyBookshelf.Server.Models.Books
{
    public class Books
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public string Description { get; set; }
        public int PageCount { get; set; }
        public int AudioLength { get; set; }
        public DateTime CreateDate { get; set; }
        public string ImageFileName { get; set; }
        public Books(int bookId, string tile, int authorId, string description,  int pageCount, int audioLength, DateTime createDate, string imageFileName)
        {
            BookId = bookId;
            Title = tile;
            AuthorId = authorId;
            Description = description;
            PageCount = pageCount;
            AudioLength = audioLength;
            CreateDate = createDate;
            ImageFileName = imageFileName;
        }

        
     

    }
}
