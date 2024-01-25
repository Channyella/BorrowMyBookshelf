namespace BorrowMyBookshelf.Server.Models.Genres
{
    public class Genres
    {
        public int GenreId { get; set; }
        public string GenreType { get; set; }
        public Genres(int genreId, string genreType)
        {
            GenreId = genreId;
            GenreType = genreType;
        }
    }
}
