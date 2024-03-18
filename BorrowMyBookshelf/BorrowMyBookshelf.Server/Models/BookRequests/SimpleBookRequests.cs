using static BorrowMyBookshelf.Server.Models.BookRequests.BookRequests;

namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class SimpleBookRequests
    {
        public int BookRequestId { get; set; }
        public int UserBookId { get; set; }
        public DateTime RequestDate { get; set; }
        public StatusEnum BookRequestStatus { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int BorrowerUserId { get; set; }
        public SimpleBookRequests(int bookRequestId, int userBookId, DateTime requestDate, StatusEnum bookRequestStatus, DateTime? dueDate, DateTime? returnDate, int borrowerUserId)
        {
            BookRequestId = bookRequestId;
            UserBookId = userBookId;
            RequestDate = requestDate;
            BookRequestStatus = bookRequestStatus;
            DueDate = dueDate;
            ReturnDate = returnDate;
            BorrowerUserId = borrowerUserId;
        }

    }
}
