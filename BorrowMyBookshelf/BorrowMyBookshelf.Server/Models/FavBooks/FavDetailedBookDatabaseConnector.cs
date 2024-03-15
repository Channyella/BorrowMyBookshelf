using BorrowMyBookshelf.Server.Models.Authors;
using BorrowMyBookshelf.Server.Models.FavAuthors;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.FavBooks
{
    public class FavDetailedBookDatabaseConnector : DatabaseConnector<FavDetailedBook>
    {
        protected override string TableName => "fav_books JOIN books ON fav_books.book_id = books.book_id";
        protected override string SelectColumns => "fav_books.fav_book_id, fav_books.user_id, books.*";
        protected override string GroupBy => "";
        protected override string Id => "user_id";
        protected override List<string> NullableColumns => [];

        protected override FavDetailedBook MakeRow(MySqlDataReader reader)
        {
            Books.Books book = new(
                reader.GetInt32("book_id"),
                reader.GetString("title"),
                reader.GetInt32("author_id"),
                SafeGetInt32("page_count", reader),
                reader.GetDateTime("create_date"),
                SafeGetString("image_file_name", reader),
                SafeGetString("description", reader),
                SafeGetInt32("audio_length", reader)
            );

            return new FavDetailedBook(
                reader.GetInt32("fav_book_id"),
                reader.GetInt32("user_id"),
                book
            );
        }

        public List<FavDetailedBook> GetFavBooksByUserId(int userId)
        {
            return GetByForeignKey("user_id", userId);
        }
    }
}
