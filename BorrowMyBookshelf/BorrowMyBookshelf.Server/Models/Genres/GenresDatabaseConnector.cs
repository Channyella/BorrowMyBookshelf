using BorrowMyBookshelf.Server.Models.Authors;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Genres
{
    public class GenresDatabaseConnector : DatabaseConnector<Genres>
    {
        protected override string TableName => "genres";
        protected override string Id => "genre_id";
        protected override List<string> NullableColumns => [];
        protected override Genres MakeRow(MySqlDataReader reader)
        {
            return new Genres(
                reader.GetInt32("genre_id"),
                reader.GetString("genre_type"));
        }
        public long CreateGenres(CreateGenres createGenres)
        {
            List<(string, object?)> columnsWithValues = new();
            columnsWithValues.Add(("genre_type", createGenres.GenreType));
            List<Genres> existingGenre = GetByColumns(columnsWithValues);
            if (existingGenre.Count() > 0) {
                return existingGenre[0].GenreId;
            }
            return Insert(columnsWithValues);
        }
        public void UpdateGenres( UpdateGenres updateGenres, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("genre_type", updateGenres.GenreType)
                ];
            List<string> NullableColumns = updateGenres.ColumnsToNullify.Split(',').ToList();
            Update(columnsWithValues, id, NullableColumns);
        }
    }
}
