using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.FavGenres
{
    public class FavDetailedGenreDatabaseConnector : DatabaseConnector<FavDetailedGenre>
    {
        protected override string TableName => "fav_genres JOIN genres ON fav_genres.genre_id = genres.genre_id";
        protected override string SelectColumns => "fav_genres.fav_genre_id, fav_genres.user_id, genres.*";
        protected override string GroupBy => "";
        protected override string Id => "user_id";
        protected override List<string> NullableColumns => [];

        protected override FavDetailedGenre MakeRow(MySqlDataReader reader)
        {
            Genres.Genres genre = new(
              reader.GetInt32("genre_id"),
              reader.GetString("genre_type")
            );

            return new FavDetailedGenre(
                reader.GetInt32("fav_genre_id"),
                reader.GetInt32("user_id"),
                genre
                );
        }

        public List<FavDetailedGenre> GetFavGenresByUserId(int userId)
        {
            return GetByForeignKey("user_id", userId);
        }
    }
}
