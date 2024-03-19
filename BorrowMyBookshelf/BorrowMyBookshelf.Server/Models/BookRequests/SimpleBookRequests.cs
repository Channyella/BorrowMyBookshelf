using static BorrowMyBookshelf.Server.Models.BookRequests.BookRequests;

namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class SimpleBookRequests(int bookRequestId, int userBookId, DateTime requestDate, StatusEnum bookRequestStatus, DateTime? dueDate, DateTime? returnDate, int borrowerUserId)
    {
        public int BookRequestId { get; set; } = bookRequestId;
        public int UserBookId { get; set; } = userBookId;
        public DateTime RequestDate { get; set; } = requestDate;
        public StatusEnum BookRequestStatus { get; set; } = bookRequestStatus;
        public DateTime? DueDate { get; set; } = dueDate;
        public DateTime? ReturnDate { get; set; } = returnDate;
        public int BorrowerUserId { get; set; } = borrowerUserId;
    }
}
