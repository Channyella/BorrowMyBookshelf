using static BorrowMyBookshelf.Server.Models.Reviews.Reviews;

namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class CreateReviews
    {
        public int UserId { get; set; }
        public int BookId { get; set; }
        public ReviewBookFormatEnum? BookFormat { get; set; }
        public string? Summary { get; set; }
        public int Rating { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public CreateReviews()
        {
            UserId = -1;
            BookId = -1;
            BookFormat = null;
            Summary = null;
            Rating = -1;
            StartDate = null;
            FinishedDate = null;
            CreateDate = DateTime.Now;
            UpdatedDate = null;
        }
    }
}
