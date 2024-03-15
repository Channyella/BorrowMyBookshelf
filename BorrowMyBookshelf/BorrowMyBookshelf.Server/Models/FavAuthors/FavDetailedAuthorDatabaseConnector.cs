using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class FavDetailedAuthorDatabaseConnector : DatabaseConnector<FavDetailedAuthor>
    {
        protected override string TableName => "fav_authors JOIN authors ON fav_authors.author_id = authors.author_id";
        protected override string SelectColumns => "fav_authors.fav_author_id, fav_authors.user_id, authors.*";
        protected override string GroupBy => "";
        protected override string Id => "user_id";
        protected override List<string> NullableColumns => [];

        protected override FavDetailedAuthor MakeRow(MySqlDataReader reader)
        {
            Authors.Authors author = new(
                reader.GetInt32("author_id"),
                reader.GetString("first_name"),
                SafeGetString("middle_name", reader),
                reader.GetString("last_name")
            );

            return new FavDetailedAuthor(
                reader.GetInt32("fav_author_id"),
                reader.GetInt32("user_id"),
                author
            );
        }

        public List<FavDetailedAuthor> GetFavAuthorsByUserId(int userId)
        {
            return GetByForeignKey("user_id", userId);
        }
    }
}
