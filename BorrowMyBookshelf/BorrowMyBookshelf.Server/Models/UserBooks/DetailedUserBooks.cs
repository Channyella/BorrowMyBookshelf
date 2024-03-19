using BorrowMyBookshelf.Server.Models.Books;

namespace BorrowMyBookshelf.Server.Models.UserBooks
{
    public class DetailedUserBooks(int userBookId, int userId, DetailedBook book, BookRequests.BookRequests? bookRequest, bool borrowable, UserBooks.BookFormatEnum bookFormat)
    {
        public int UserBookId { get; set; } = userBookId;
        public int UserId { get; set; } = userId;
        public DetailedBook Book { get; set; } = book;
        public BookRequests.BookRequests? BookRequest { get; set; } = bookRequest;
        public bool Borrowable { get; set; } = borrowable;
        public UserBooks.BookFormatEnum BookFormat { get; set; } = bookFormat;
    }
}
