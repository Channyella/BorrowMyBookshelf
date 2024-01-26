using MySql.Data.MySqlClient;
using System.Runtime.CompilerServices;

namespace BorrowMyBookshelf.Server.Models.BookTags
{
    public class BookTagsDatabaseConnector : DatabaseConnector<BookTags>
    {
        protected override string TableName => "book_tags";
        protected override string Id => "book_tag_id";
        protected override BookTags MakeRow(MySqlDataReader reader)
        {
            return new BookTags(
                reader.GetInt32("book_tag_id"),
                reader.GetInt32("user_book_id"),
                reader.GetInt32("tag_id")
                );
        }
    }
}
