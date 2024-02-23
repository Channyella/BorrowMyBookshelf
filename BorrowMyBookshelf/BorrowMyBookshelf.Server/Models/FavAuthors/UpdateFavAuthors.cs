namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class UpdateFavAuthors
    {
        public int? UserId { get; set; }
        public int? AuthorId { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateFavAuthors()
        {
            UserId = null;
            AuthorId = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
