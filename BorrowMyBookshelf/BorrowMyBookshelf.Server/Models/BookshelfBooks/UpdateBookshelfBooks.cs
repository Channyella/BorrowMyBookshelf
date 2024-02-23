namespace BorrowMyBookshelf.Server.Models.BookshelfBooks
{
    public class UpdateBookshelfBooks
    {
        public int? BookshelfId { get; set; }
        public int? UserBookId { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateBookshelfBooks()
        {
            BookshelfId = null;
            UserBookId = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
