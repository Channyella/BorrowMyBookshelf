using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.FavBooks
{
    public class FavBooksDatabaseConnector : DatabaseConnector<FavBooks>
    {
        protected override string TableName => "fav_books";
        protected override string Id => "fav_book_id";
        protected override List<string> NullableColumns => [];
        protected override FavBooks MakeRow(MySqlDataReader reader)
        {
            return new FavBooks(
                reader.GetInt32("fav_book_id"),
                reader.GetInt32("user_id"),
                reader.GetInt32("book_id")
                );
        }
        public long CreateFavBook(CreateFavBooks createFavBooks)
        {
            List<(string, object?)> columnsWithValues = new();
            columnsWithValues.Add(("user_id", createFavBooks.UserId));
            columnsWithValues.Add(("book_id", createFavBooks.BookId));
            return Insert(columnsWithValues);
        }
        public void UpdateFavBook(UpdateFavBooks updateFavBooks, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("user_id", updateFavBooks.UserId),
                    ("book_id", updateFavBooks.BookId)
                ];
            List<string> NullableColumns = updateFavBooks.ColumnsToNullify.Split(',').ToList();
            Update(columnsWithValues, id, NullableColumns);
        }
    }
}
