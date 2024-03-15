namespace BorrowMyBookshelf.Server.Models.FavGenres
{
    public class FavDetailedGenre
    {
        public int FavGenreId { get; set; }
        public int UserId { get; set; }
        public Genres.Genres Genre { get; set; }
        public FavDetailedGenre(int favGenreId, int userId, Genres.Genres genre)
        {
            FavGenreId = favGenreId;
            UserId = userId;
            Genre = genre;
        }
    }
}
