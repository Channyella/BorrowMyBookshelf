using MySql.Data.MySqlClient;
using System.Runtime.CompilerServices;

namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class FavAuthorsDatabaseConnector : DatabaseConnector<FavAuthors>
    {
        protected override string TableName => "fav_authors";
        protected override string Id => "fav_author_id";
        protected override FavAuthors MakeRow(MySqlDataReader reader)
        {
            return new FavAuthors(
                reader.GetInt32("fav_author_id"),
                reader.GetInt32("user_id"),
                reader.GetInt32("author_id")
                );
        }
    }
}
