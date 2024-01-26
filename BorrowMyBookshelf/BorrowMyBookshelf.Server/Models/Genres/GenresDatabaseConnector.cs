using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Genres
{
    public class GenresDatabaseConnector : DatabaseConnector<Genres>
    {
        protected override string TableName => "genres";
        protected override string Id => "genre_id";
        protected override Genres MakeRow(MySqlDataReader reader)
        {
            return new Genres(
                reader.GetInt32("genre_id"),
                reader.GetString("genre_type"));
        }
    }
}
