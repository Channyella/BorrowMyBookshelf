using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.FavGenres
{
    public class FavGenresDatabaseConnector : DatabaseConnector<FavGenres>
    {
        protected override string TableName => "fav_genres";
        protected override string Id => "fav_genre_id";
        protected override FavGenres MakeRow(MySqlDataReader reader)
        {
            return new FavGenres(
                reader.GetInt32("fav_genre_id"),
                reader.GetInt32("user_id"),
                reader.GetInt32("author_id")
                );
        }
    }
}
