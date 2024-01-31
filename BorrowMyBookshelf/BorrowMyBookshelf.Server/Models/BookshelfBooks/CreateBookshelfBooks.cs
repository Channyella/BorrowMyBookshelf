namespace BorrowMyBookshelf.Server.Models.BookshelfBooks
{
    public class CreateBookshelfBooks
    {
        public int BookshelfId { get; set; }
        public int UserBookId { get; set; }
        public CreateBookshelfBooks()
        {
            BookshelfId = -1;
            UserBookId = -1;
        }
    }
}
