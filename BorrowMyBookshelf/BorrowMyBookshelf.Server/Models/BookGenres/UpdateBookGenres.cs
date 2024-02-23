namespace BorrowMyBookshelf.Server.Models.BookGenres
{
    public class UpdateBookGenres
    {
        public int? BookId { get; set; }
        public int? GenreId { get; set; }
        public string ColumnsToNullify { get; set; }

        public UpdateBookGenres()
        {
            BookId = null;
            GenreId = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
