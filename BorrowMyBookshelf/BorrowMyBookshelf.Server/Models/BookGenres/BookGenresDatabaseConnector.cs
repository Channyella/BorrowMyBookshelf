using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.BookGenres
{
    public class BookGenresDatabaseConnector : DatabaseConnector<BookGenres>
    {
        protected override string TableName => "book_genres";
        protected override string Id => "book_genre_id";
        protected override BookGenres MakeRow(MySqlDataReader reader)
        {
            return new BookGenres(
                reader.GetInt32("book_genre_id"),
                reader.GetInt32("book_id"),
                reader.GetInt32("genre_id")
                );
        }
    }
}
