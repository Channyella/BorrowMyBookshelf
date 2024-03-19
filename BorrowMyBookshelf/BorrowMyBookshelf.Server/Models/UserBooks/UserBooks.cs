namespace BorrowMyBookshelf.Server.Models.UserBooks
{
    public class UserBooks(int userBookId, int bookId, bool borrowable, UserBooks.BookFormatEnum bookFormat, int userId)
    {
        public int UserBookId { get; set; } = userBookId;
        public int BookId { get; set; } = bookId;
        public bool Borrowable { get; set; } = borrowable;
        public BookFormatEnum BookFormat { get; set; } = bookFormat;
        public int UserId { get; set; } = userId;

        public enum BookFormatEnum
        {
            Hardcover = 1,
            Paperback = 2,
            eBook = 3,
            AudioBook = 4,
        }
    }
}
