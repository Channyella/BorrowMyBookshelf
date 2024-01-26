using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Authors
{
    public class AuthorsDatabaseConnector : DatabaseConnector<Authors>
    {
        protected override string TableName => "authors";
        protected override string Id => "author_id";
        protected override Authors MakeRow(MySqlDataReader reader)
        {
            return new Authors(
                reader.GetInt32("author_id"),
                reader.GetString("first_name"),
                reader.GetString("last_name")
                );
        }
    }
}
