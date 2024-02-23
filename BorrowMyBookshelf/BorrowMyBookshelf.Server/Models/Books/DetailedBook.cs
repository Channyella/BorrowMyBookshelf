namespace BorrowMyBookshelf.Server.Models.Books
{
    public class DetailedBook
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public Authors.Authors Author { get; set; }
        public Genres.Genres[] Genres { get; set; }
        public int? PageCount { get; set; }
        public DateTime CreateDate { get; set; }
        public string? ImageFileName { get; set; }
        public string? Description { get; set; }
        public int? AudioLength { get; set; }
        public DetailedBook(int bookId, string title, Authors.Authors author, Genres.Genres[] genres, int? pageCount, DateTime createDate, string? imageFileName, string? description, int? audioLength)
        {
            BookId = bookId;
            Title = title;
            Author = author;
            Genres = genres;
            PageCount = pageCount;
            CreateDate = createDate;
            ImageFileName = imageFileName;
            Description = description;
            AudioLength = audioLength;
        }
        public DetailedBook(Books bookInfo, Authors.Authors authorInfo, Genres.Genres[] genreInfo)
        {
            BookId = bookInfo.BookId;
            Title = bookInfo.Title;
            Author = authorInfo;
            Genres = genreInfo;
            PageCount = bookInfo.PageCount;
            CreateDate = bookInfo.CreateDate;
            ImageFileName = bookInfo.ImageFileName;
            Description = bookInfo.Description;
            AudioLength = bookInfo.AudioLength;
        }
    }
}
