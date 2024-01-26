using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class ReviewsDatabaseConnector : DatabaseConnector<Reviews>
    {
        protected override string TableName => "reviews";
        protected override string Id => "review_id";
        protected override Reviews MakeRow(MySqlDataReader reader)
        {
            return new Reviews(
                reader.GetInt32("review_id"),
                reader.GetInt32("user_id"),
                reader.GetInt32("book_id"),
                ParseBookFormatEnum(reader.GetString("book_format")),
                reader.GetString("summary"),
                reader.GetInt32("rating"),
                reader.GetDateTime("start_date"),
                reader.GetDateTime("finished_date"),
                reader.GetDateTime("create_date"),
                reader.GetDateTime("updated_date")
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
