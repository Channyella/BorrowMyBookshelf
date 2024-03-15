using BorrowMyBookshelf.Server.Models.Books;

namespace BorrowMyBookshelf.Server.Models.FavBooks
{
    public class FavDetailedBook
    {
        public int FavBookId { get; set; }
        public int UserId { get; set; }
        public Books.Books Book { get; set; }

        public FavDetailedBook(int favBookId, int userId, Books.Books book)
        {
            FavBookId = favBookId;
            UserId = userId;
            Book = book;
        }
    }
}
