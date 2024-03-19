namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class FavAuthors(int favAuthorsId, int userId, int authorId)
    {
        public int FavAuthorsId { get; set; } = favAuthorsId;
        public int UserId { get; set; } = userId;
        public int AuthorId { get; set; } = authorId;
    }
}
