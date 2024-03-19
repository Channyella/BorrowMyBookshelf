namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class BookRequests(int bookRequestId, int userBookId, DateTime requestDate, BookRequests.StatusEnum bookRequestStatus, DateTime? dueDate, DateTime? returnDate, Users.Users borrowerUser)
    {
        public int BookRequestId { get; set; } = bookRequestId;
        public int UserBookId { get; set; } = userBookId;
        public DateTime RequestDate { get; set; } = requestDate;
        public StatusEnum BookRequestStatus { get; set; } = bookRequestStatus;
        public DateTime? DueDate { get; set; } = dueDate;
        public DateTime? ReturnDate { get; set; } = returnDate;
        public Users.Users BorrowerUser { get; set; } = borrowerUser;

        public enum StatusEnum
        {
            Pending = 1,
            Accepted = 2,
            Denied = 3,
            Borrowed = 4,
            Returned = 5,
        }

    }
}
