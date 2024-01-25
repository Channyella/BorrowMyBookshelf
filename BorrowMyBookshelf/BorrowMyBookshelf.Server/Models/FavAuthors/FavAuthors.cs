namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class FavAuthors
    {
        public int FavAuthorsId { get; set; }
        public int UserId { get; set; }
        public int AuthorId { get; set; }
        public FavAuthors(int favAuthorsId, int userId, int authorId)
        {
            FavAuthorsId = favAuthorsId;
            UserId = userId;
            AuthorId = authorId;
        }
    }
}
