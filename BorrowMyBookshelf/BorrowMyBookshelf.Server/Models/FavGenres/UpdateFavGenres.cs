namespace BorrowMyBookshelf.Server.Models.FavGenres
{
    public class UpdateFavGenres
    {
        public int? UserId { get; set; }
        public int? GenreId { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateFavGenres()
        {
            UserId = null;
            GenreId = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
