using static BorrowMyBookshelf.Server.Models.Reviews.Reviews;

namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class UpdateReviews
    {
        public int? UserId { get; set; }
        public int? BookId { get; set; }
        public ReviewBookFormatEnum? BookFormat { get; set; }
        public string? Summary { get; set; }
        public int? Rating { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateReviews()
        {
            UserId = null;
            BookId = null;
            BookFormat = null;
            Summary = null;
            Rating = null;
            StartDate = null;
            FinishedDate = null;
            CreateDate = null;
            UpdatedDate = DateTime.Now;
            ColumnsToNullify = String.Empty;
        }
    }
}
