namespace BorrowMyBookshelf.Server.Models.FavBooks
{
    public class FavBooks
    {
        public int FavBookId { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public FavBooks(int favBookId, int userId, int bookId) {
            FavBookId = favBookId;
            UserId = userId;
            BookId = bookId;
        }
    }
}
