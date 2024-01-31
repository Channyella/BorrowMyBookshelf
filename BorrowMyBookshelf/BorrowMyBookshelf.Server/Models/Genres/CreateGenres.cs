namespace BorrowMyBookshelf.Server.Models.Genres
{
    public class CreateGenres
    {
        public string GenreType { get; set; }

        public CreateGenres()
        {
            GenreType = "Missing";
        }
    }
}
