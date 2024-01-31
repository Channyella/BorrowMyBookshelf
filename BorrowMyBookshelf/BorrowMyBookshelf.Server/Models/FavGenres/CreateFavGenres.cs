namespace BorrowMyBookshelf.Server.Models.FavGenres
{
    public class CreateFavGenres
    {
        public int UserId { get; set; }
        public int GenreId { get; set; }
        public CreateFavGenres()
        {
            UserId = -1;
            GenreId = -1;
        }
    }
}
