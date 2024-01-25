namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class BookRequests
    {
        public int BookRequestId { get; set; }
        public int UserBookId { get; set; }
        public DateTime RequestDate { get; set; }
        public StatusEnum Status { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public int BorrowerUserId { get; set; }
        public BookRequests(int bookRequestId, int userBookId, DateTime requestDate, StatusEnum status, DateTime dueDate, DateTime returnDate, int borrowerUserId)
        {
            BookRequestId = bookRequestId;
            UserBookId = userBookId;
            RequestDate = requestDate;
            Status = status;
            DueDate = dueDate;
            ReturnDate = returnDate;
            BorrowerUserId = borrowerUserId;
        }
        public enum StatusEnum
        {
            Pending,
            Accepted,
            Denied,
            Borrowed,
            Returned,
        }

    }
}
