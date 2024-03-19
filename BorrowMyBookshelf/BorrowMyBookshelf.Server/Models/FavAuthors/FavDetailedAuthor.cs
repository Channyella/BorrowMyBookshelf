namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class FavDetailedAuthor(int favAuthorId, int userId, Authors.Authors author)
    {
        public int FavAuthorId { get; set; } = favAuthorId;
        public int UserId { get; set; } = userId;
        public Authors.Authors Author { get; set; } = author;
    }
}
