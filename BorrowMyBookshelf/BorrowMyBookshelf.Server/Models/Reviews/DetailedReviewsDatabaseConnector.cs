using BorrowMyBookshelf.Server.Models.Books;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class DetailedReviewsDatabaseConnector : DatabaseConnector<DetailedReviews>
    {
        protected override string TableName => "reviews JOIN users ON reviews.user_id = users.user_id JOIN books ON reviews.book_id = books.book_id";
        protected override string Id => "book_id";
        protected override string SelectColumns => "*";
        protected override List<string> NullableColumns => [];

        protected override DetailedReviews MakeRow(MySqlDataReader reader)
        {
            reader.IsDBNull(reader.GetOrdinal("updated_date"));
            Users.Users user= new(reader.GetInt32("user_id"),
                reader.GetString("first_name"),
                reader.GetString("last_name"),
                reader.GetString("email"),
                reader.GetString("password_hash"),
                SafeGetString("notes", reader),
                SafeGetString("image_file_name", reader),
                reader.GetDateTime("create_date"),
                SafeGetDateTime("updated_date", reader)
                );
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


            string? bookFormat = SafeGetString("book_format", reader);
            return new DetailedReviews(
                reader.GetInt32("review_id"),
                user,
                book,
                bookFormat == null ? null : global::BorrowMyBookshelf.Server.Models.Reviews.DetailedReviewsDatabaseConnector.ParseBookFormatEnum(bookFormat),
                SafeGetString("summary", reader),
                reader.GetInt32("rating"),
                SafeGetDateTime("start_date", reader),
                SafeGetDateTime("finished_date", reader),
                reader.GetDateTime("create_date"),
                SafeGetDateTime("updated_date", reader)
                );
        }

        private static Reviews.ReviewBookFormatEnum ParseBookFormatEnum(string bookFormat)
        {
            if (bookFormat == "physical")
            {
                return Reviews.ReviewBookFormatEnum.Physical;
            }
            else if (bookFormat == "eBook")
            {
                return Reviews.ReviewBookFormatEnum.eBook;
            }
            else
            {
                return Reviews.ReviewBookFormatEnum.AudioBook;
            }
        }
        public List<DetailedReviews> GetDetailedReviewsByBookId(int bookId)
        {
            return GetByForeignKey("reviews.book_id", bookId);
        }


    }
}
