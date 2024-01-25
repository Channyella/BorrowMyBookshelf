namespace BorrowMyBookshelf.Server.Models.BookGenres
{
    public class BookGenres
    {
        public int BookGenreId { get; set; }
        public int BookId { get; set; }
        public string GenreId { get; set; }
        public BookGenres(int bookGenreId, int bookId, string genreId)
        {
            BookGenreId = bookGenreId;
            BookId = bookId;
            GenreId = genreId;
        }
    }
}
