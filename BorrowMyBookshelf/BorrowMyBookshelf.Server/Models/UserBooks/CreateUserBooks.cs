using static BorrowMyBookshelf.Server.Models.UserBooks.UserBooks;

namespace BorrowMyBookshelf.Server.Models.UserBooks
{
    public class CreateUserBooks
    {
        public int BookId { get; set; }
        public bool Borrowable { get; set; }
        public BookFormatEnum BookFormat { get; set; }
        public int UserId { get; set; }
        public CreateUserBooks()
        {
            BookId = -1;
            Borrowable = false;
            BookFormat = BookFormatEnum.Paperback;
            UserId = -1;
        }
    }
}
