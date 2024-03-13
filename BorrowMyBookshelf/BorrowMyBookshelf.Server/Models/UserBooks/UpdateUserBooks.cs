
using static BorrowMyBookshelf.Server.Models.UserBooks.UserBooks;

namespace BorrowMyBookshelf.Server.Models.UserBooks
{
    public class UpdateUserBooks
    {
        public int? BookId { get; set; }
        public bool? Borrowable { get; set; }
        public BookFormatEnum? BookFormat { get; set; }
        public int? UserId { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateUserBooks()
        {
            BookId = null;
            Borrowable = null;
            BookFormat = null;
            UserId = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
