using BorrowMyBookshelf.Server.Models.Authors;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.BookGenres
{
    public class BookGenresDatabaseConnector : DatabaseConnector<BookGenres>
    {
        protected override string TableName => "book_genres";
        protected override string Id => "book_genre_id";
        protected override List<string> NullableColumns => [];
        protected override BookGenres MakeRow(MySqlDataReader reader)
        {
            return new BookGenres(
                reader.GetInt32("book_genre_id"),
                reader.GetInt32("book_id"),
                reader.GetInt32("genre_id")
                );
        }
        public void CreateBookGenres(CreateBookGenres createBookGenres)
        {
            List<(string, object?)> columnsWithValues = new();
            columnsWithValues.Add(("book_id", createBookGenres.BookId));
            columnsWithValues.Add(("genre_id", createBookGenres.GenreId));
            Insert(columnsWithValues);
        }

        public void UpdateBookGenres(UpdateBookGenres updateBookGenres, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("book_id", updateBookGenres.BookId),
                    ("genre_id", updateBookGenres.GenreId)
                ];
            List<string> NullableColumns = updateBookGenres.ColumnsToNullify.Split(',').ToList();
            Update(columnsWithValues, id, NullableColumns);
        }
        public List<Genres.Genres> GetGenresByBookId(int bookId)
        {
            List<BookGenres> bookGenres = GetByForeignKey("book_id", bookId);
            Genres.GenresDatabaseConnector genresDatabase = new();
            List<Genres.Genres> genres = new();
            foreach (BookGenres bookGenre in bookGenres)
            {
                Genres.Genres? genre = genresDatabase.GetById(bookGenre.BookId);
                if (genre != null)
                {
                    genres.Add(genre);
                }
            }
            return genres;
        }
    }
}
