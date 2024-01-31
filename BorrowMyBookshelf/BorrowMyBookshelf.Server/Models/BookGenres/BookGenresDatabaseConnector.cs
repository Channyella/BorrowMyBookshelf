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
            List<(string, object)> columnsWithValues = new();
            columnsWithValues.Add(("book_id", createBookGenres.BookId));
            columnsWithValues.Add(("genre_id", createBookGenres.GenreId));
            Insert(columnsWithValues);
        }
    }
}
