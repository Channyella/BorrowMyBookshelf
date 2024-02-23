using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class ReviewsDatabaseConnector : DatabaseConnector<Reviews>
    {
        protected override string TableName => "reviews";
        protected override string Id => "review_id";
        protected override List<string> NullableColumns => ["book_format", "summary", "start_date", "finished_date", "updated_date"];
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
        public void CreateReviews(CreateReviews createReviews)
        {
            List<(string, object?)> columnsWithRows =
                [
                    ("user_id", createReviews.UserId),
                    ("book_id", createReviews.BookId),
                    ("book_format", createReviews.BookFormat),
                    ("summary", createReviews.Summary),
                    ("rating", createReviews.Rating),
                    ("start_date", createReviews.StartDate),
                    ("finished_date", createReviews.FinishedDate),
                    ("create_date", createReviews.CreateDate),
                    ("updated_date", createReviews.UpdatedDate)
                ];
            Insert(columnsWithRows);
        }
        public void UpdateReviews(UpdateReviews updateReviews, int id)
        {
            List<(string, object?)> columnsWithRows =
                [
                    ("user_id", updateReviews.UserId),
                    ("book_id", updateReviews.BookId),
                    ("book_format", updateReviews.BookFormat),
                    ("summary", updateReviews.Summary),
                    ("rating", updateReviews.Rating),
                    ("start_date", updateReviews.StartDate),
                    ("finished_date", updateReviews.FinishedDate),
                    ("create_date", updateReviews.CreateDate),
                    ("updated_date", updateReviews.UpdatedDate)
                ];
            List<string> NullableColumns = updateReviews.ColumnsToNullify.Split(',').ToList();
            Update(columnsWithRows, id, NullableColumns);
        }
    }
}
