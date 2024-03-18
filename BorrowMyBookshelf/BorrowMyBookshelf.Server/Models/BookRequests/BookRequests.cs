﻿namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class BookRequests
    {
        public int BookRequestId { get; set; }
        public int UserBookId { get; set; }
        public DateTime RequestDate { get; set; }
        public StatusEnum BookRequestStatus { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public Users.Users BorrowerUser { get; set; }
        public BookRequests(int bookRequestId, int userBookId, DateTime requestDate, StatusEnum bookRequestStatus, DateTime? dueDate, DateTime? returnDate, Users.Users borrowerUser)
        {
            BookRequestId = bookRequestId;
            UserBookId = userBookId;
            RequestDate = requestDate;
            BookRequestStatus = bookRequestStatus;
            DueDate = dueDate;
            ReturnDate = returnDate;
            BorrowerUser = borrowerUser;
        }
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
