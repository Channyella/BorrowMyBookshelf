namespace BorrowMyBookshelf.Server.Models.UserBooks
{
    public class UserBooks
    {
        public int UserBookId { get; set; }
        public int BookId { get; set; }
        public bool Borrowable { get; set; }
        public BookFormatEnum BookFormat { get; set; }
        public UserBooks(int userBookId, int bookId, bool borrowable, BookFormatEnum bookFormat)
        {
            UserBookId = userBookId;
            BookId = bookId;
            Borrowable = borrowable;
            BookFormat = bookFormat;
        }
        public enum BookFormatEnum
        {
            Hardcover,
            Paperback,
            eBook,
            AudioBook,
        }
    }
}
