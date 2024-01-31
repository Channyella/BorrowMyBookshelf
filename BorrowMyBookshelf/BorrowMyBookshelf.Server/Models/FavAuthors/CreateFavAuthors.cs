namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class CreateFavAuthors
    {
        public int UserId { get; set; }
        public int AuthorId { get; set; }
        public CreateFavAuthors() {
            UserId = -1;
            AuthorId = -1;
        }
    }
}
