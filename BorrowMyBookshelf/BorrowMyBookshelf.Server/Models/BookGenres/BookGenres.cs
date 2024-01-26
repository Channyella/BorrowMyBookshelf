namespace BorrowMyBookshelf.Server.Models.BookGenres
{
    public class BookGenres
    {
        public int BookGenreId { get; set; }
        public int BookId { get; set; }
        public int GenreId { get; set; }
        public BookGenres(int bookGenreId, int bookId, int genreId)
        {
            BookGenreId = bookGenreId;
            BookId = bookId;
            GenreId = genreId;
        }
    }
}
