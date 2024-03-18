using MySql.Data.MySqlClient;
using static BorrowMyBookshelf.Server.Models.BookRequests.BookRequests;


namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class SimpleBookRequestsDatabaseConnector : DatabaseConnector<SimpleBookRequests>
    {
        protected override string TableName => "book_requests";
        protected override string Id => "book_request_id";
        protected override List<string> NullableColumns => ["due_date", "return_date"];
        protected override SimpleBookRequests MakeRow(MySqlDataReader reader)
        {

            return new SimpleBookRequests(
                reader.GetInt32("book_request_id"),
                reader.GetInt32("user_book_id"),
                reader.GetDateTime("request_date"),
                ParseStatusEnum(reader.GetString("book_request_status")),
                SafeGetDateTime("due_date", reader),
                SafeGetDateTime("return_date", reader),
                reader.GetInt32("borrower_user_id")
                );
        }

        private StatusEnum ParseStatusEnum(string status)
        {
            if (status == "pending")
            {
                return StatusEnum.Pending;
            }
            else if (status == "accepted")
            {
                return StatusEnum.Accepted;
            }
            else if (status == "denied")
            {
                return StatusEnum.Denied;
            }
            else if (status == "borrowed")
            {
                return StatusEnum.Borrowed;
            }
            else
            {
                return StatusEnum.Returned;
            }
        }
        public long CreateBookRequests(CreateBookRequests createBookRequests)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("user_book_id", createBookRequests.UserBookId),
                    ("request_date", createBookRequests.RequestDate),
                    ("book_request_status", createBookRequests.BookRequestStatus),
                    ("due_date", createBookRequests.DueDate),
                    ("return_date", createBookRequests.ReturnDate),
                    ("borrower_user_id", createBookRequests.BorrowerUserId)
                ];
            return Insert(columnsWithValues);
        }
        public void UpdateBookRequests(UpdateBookRequests updateBookRequests, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("user_book_id", updateBookRequests.UserBookId),
                    ("request_date", updateBookRequests.RequestDate),
                    ("book_request_status", updateBookRequests.BookRequestStatus),
                    ("due_date", updateBookRequests.DueDate),
                    ("return_date", updateBookRequests.ReturnDate),
                    ("borrower_user_id", updateBookRequests.BorrowerUserId)
                ];
            List<string> NullableColumns = updateBookRequests.ColumnsToNulllify.Split(',').ToList();
            Update(columnsWithValues, id, NullableColumns);
        }
    }
}
