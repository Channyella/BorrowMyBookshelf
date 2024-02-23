namespace BorrowMyBookshelf.Server.Models.FavBooks
{
    public class UpdateFavBooks
    {
        public int? UserId { get; set; }
        public int? BookId { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateFavBooks()
        {
            UserId = null;
            BookId = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
