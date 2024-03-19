using BorrowMyBookshelf.Server.Models.Authors;
using MySql.Data.MySqlClient;
using System.Runtime.CompilerServices;

namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class FavAuthorsDatabaseConnector : DatabaseConnector<FavAuthors>
    {
        protected override string TableName => "fav_authors";
        protected override string Id => "fav_author_id";
        protected override List<string> NullableColumns => [];
        protected override FavAuthors MakeRow(MySqlDataReader reader)
        {
            return new FavAuthors(
                reader.GetInt32("fav_author_id"),
                reader.GetInt32("user_id"),
                reader.GetInt32("author_id")
                );
        }

        public long CreateFavAuthor(CreateFavAuthors createFavAuthors)
        {
            List<(string, object?)> columnWithValues = [("user_id", createFavAuthors.UserId), ("author_id", createFavAuthors.AuthorId)];
            List<FavAuthors> existingFavAuthors = GetByColumns(columnWithValues);
            if (existingFavAuthors.Count > 0)
            {
                return existingFavAuthors[0].FavAuthorsId;
            }
            return Insert(columnWithValues);
        }
        public void UpdateFavAuthor(UpdateFavAuthors updateFavAuthors, int id)
        {
            List<(string, object?)> columnWithValues =
                [
                    ("user_id", updateFavAuthors.UserId),
                    ("author_id", updateFavAuthors.AuthorId)
                ];
            List<string> NullableColumns = [.. updateFavAuthors.ColumnsToNullify.Split(',')];
            Update(columnWithValues, id, NullableColumns);
        }
    }
}
