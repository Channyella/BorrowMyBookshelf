using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class BookRequestsDataController : DatabaseConnector<BookRequests>
    {
        protected override string TableName => "book_requests";
        protected override string Id => "book_request_id";
        protected override BookRequests MakeRow(MySqlDataReader reader)
        {
            return new BookRequests(
                reader.GetInt32("book_request_id"),
                reader.GetInt32("user_book_id"),
                reader.GetDateTime("request_date"),
                ParseStatusEnum(reader.GetString("state")),
                reader.GetDateTime("due_date"),
                reader.GetDateTime("return_date"),
                reader.GetInt32("borrower_user_id")
                );
        }

        private BookRequests.StatusEnum ParseStatusEnum(string status)
        {
            if (status == "pending")
            {
                return BookRequests.StatusEnum.Pending;
            }
            else if (status == "accepted")
            {
                return BookRequests.StatusEnum.Accepted;
            }
            else if (status == "denied")
            {
                return BookRequests.StatusEnum.Denied;
            }
            else if (status == "borrowed")
            {
                return BookRequests.StatusEnum.Borrowed;
            }
            else
            {
                return BookRequests.StatusEnum.Returned;
            }
        }
    }
}
