namespace BorrowMyBookshelf.Server.Models.BookshelfBooks
{
    public class BookshelfBooks
    {
        public int BookshelfBookId { get; set; }
        public int BookshelfId { get; set; }
        public int UserBookId { get; set; }
        public BookshelfBooks(int bookshelfBookId, int bookshelfId, int userBookId)
        {
            BookshelfBookId = bookshelfBookId;
            BookshelfId = bookshelfId;
            UserBookId = userBookId;
        }
    }
}
