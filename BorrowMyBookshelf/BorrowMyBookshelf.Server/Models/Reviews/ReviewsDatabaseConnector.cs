using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class ReviewsDatabaseConnector : DatabaseConnector<Reviews>
    {
        protected override string TableName => "reviews";
        protected override string Id => "review_id";
        protected override Reviews MakeRow(MySqlDataReader reader)
        {
            string? bookFormat = SafeGetString("book_format", reader);
            return new Reviews(
                reader.GetInt32("review_id"),
                reader.GetInt32("user_id"),
                reader.GetInt32("book_id"),
                bookFormat == null ? null: ParseBookFormatEnum(bookFormat),
                SafeGetString("summary", reader),
                reader.GetInt32("rating"),
                SafeGetDateTime("start_date", reader),
                SafeGetDateTime("finished_date", reader),
                reader.GetDateTime("create_date"),
                SafeGetDateTime("updated_date", reader)
                );
        }
        private Reviews.BookFormatEnum ParseBookFormatEnum(string bookFormat)
        {
            if (bookFormat == "physical")
            {
                return Reviews.BookFormatEnum.Physical;
            }
            else if (bookFormat == "eBook")
            {
                return Reviews.BookFormatEnum.eBook;
            }
            else
            {
                return Reviews.BookFormatEnum.AudioBook;
            }
        }
    }
}
