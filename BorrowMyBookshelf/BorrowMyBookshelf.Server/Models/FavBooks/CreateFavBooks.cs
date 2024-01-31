namespace BorrowMyBookshelf.Server.Models.FavBooks
{
    public class CreateFavBooks
    {
        public int UserId { get; set; }
        public int BookId { get; set; }
        public CreateFavBooks() {
            UserId = -1;
            BookId = -1;
        }

    }
}
