using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Books
{
    public class BooksDatabaseConnector : DatabaseConnector<Books>
    {
        protected override string TableName => "books";
        protected override string Id => "book_id";
        protected override Books MakeRow(MySqlDataReader reader)
        {
            return new Books(
                reader.GetInt32("book_id"),
                reader.GetString("title"),
                reader.GetInt32("author_id"),
                reader.GetInt32("page_count"),
                reader.GetInt32("audio_length"),
                reader.GetDateTime("create_date"),
                reader.GetString("image"),
                reader.GetString("description")
                ) ;
        }
    }
}
