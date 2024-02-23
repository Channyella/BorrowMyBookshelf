namespace BorrowMyBookshelf.Server.Models.Genres
{
    public class UpdateGenres
    {
        public string? GenreType { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateGenres() 
        {
            GenreType = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
