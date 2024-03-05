namespace BorrowMyBookshelf.Server.Models.Bookshelves
{
    public class UpdateBookshelves
    {
        public string? BookshelfName { get; set; }
        public int? UserId { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateBookshelves()
        {
            BookshelfName = null;
            UserId = null;
            ColumnsToNullify = "user_id";
        }
    }
}
