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
                SafeGetInt32("page_count", reader),
                reader.GetDateTime("create_date"),
                SafeGetString("image_file_name", reader),
                SafeGetString("description", reader),
                SafeGetInt32("audio_length", reader)
                ) ;
        }
    }
}
