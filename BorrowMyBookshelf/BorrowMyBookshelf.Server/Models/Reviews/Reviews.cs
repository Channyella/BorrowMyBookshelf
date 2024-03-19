namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class Reviews(int reviewId, int userId, int bookId, Reviews.ReviewBookFormatEnum? bookFormat, string? summary, int rating, DateTime? startDate, DateTime? finishedDate, DateTime createDate, DateTime? updatedDate)
    {
        public int ReviewId { get; set; } = reviewId;
        public int UserId { get; set; } = userId;
        public int BookId { get; set; } = bookId;
        public ReviewBookFormatEnum? BookFormat { get; set; } = bookFormat;
        public string? Summary { get; set; } = summary;
        public int Rating { get; set; } = rating;
        public DateTime? StartDate { get; set; } = startDate;
        public DateTime? FinishedDate { get; set; } = finishedDate;
        public DateTime CreateDate { get; set; } = createDate;
        public DateTime? UpdatedDate { get; set; } = updatedDate;

        public enum ReviewBookFormatEnum
        {
            Physical = 1,
            eBook = 2,
            AudioBook = 3,
        }
    }
}
