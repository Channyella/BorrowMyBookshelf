using BorrowMyBookshelf.Server.Models.BookshelfBooks;

namespace BorrowMyBookshelf.Server.Models.Bookshelves
{
    public class CreateBookshelves
    {
        public string BookshelfName { get; set; }
        public int UserId { get; set; }
        public CreateBookshelves()
        {
            BookshelfName = string.Empty;
            UserId = -1;
        }
    }
}
