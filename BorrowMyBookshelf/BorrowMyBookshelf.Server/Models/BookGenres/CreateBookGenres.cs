namespace BorrowMyBookshelf.Server.Models.BookGenres
{
    public class CreateBookGenres
    {
        public int BookId { get; set; }
        public int GenreId { get; set; }

        public CreateBookGenres() { 
            BookId = -1;
            GenreId = -1;
        }
    }
}
