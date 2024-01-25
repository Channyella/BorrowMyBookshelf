namespace BorrowMyBookshelf.Server.Models.FavGenres
{
    public class FavGenres
    {
        public int FavGenreId { get; set; }
        public int UserId { get; set; }
        public int GenreId { get; set; }
        public FavGenres(int favGenreId, int userId, int genreId)
        {
            FavGenreId = favGenreId;
            UserId = userId;
            GenreId = genreId;
        }
    }
}
