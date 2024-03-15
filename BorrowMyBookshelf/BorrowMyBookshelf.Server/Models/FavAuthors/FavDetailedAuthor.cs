namespace BorrowMyBookshelf.Server.Models.FavAuthors
{
    public class FavDetailedAuthor
    {
        public int FavAuthorId { get; set; }
        public int UserId { get; set; }
        public Authors.Authors Author { get; set; }

        public FavDetailedAuthor(int favAuthorId, int userId, Authors.Authors author)
        {
            FavAuthorId = favAuthorId;
            UserId = userId;
            Author = author;
        }   
    }
}
