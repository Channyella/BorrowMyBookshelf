using BorrowMyBookshelf.Server.Models.Books;
using static BorrowMyBookshelf.Server.Models.Reviews.Reviews;

namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class DetailedReviews(int reviewId, Users.Users user, Books.Books book, ReviewBookFormatEnum? bookFormat, string? summary, int rating, DateTime? startDate, DateTime? finishedDate, DateTime createDate, DateTime? updatedDate)
    {
        public int ReviewId { get; set; } = reviewId;
        public Users.Users User { get; set; } = user;
        public Books.Books Book { get; set; } = book;
        public ReviewBookFormatEnum? BookFormat { get; set; } = bookFormat;
        public string? Summary { get; set; } = summary;
        public int Rating { get; set; } = rating;
        public DateTime? StartDate { get; set; } = startDate;
        public DateTime? FinishedDate { get; set; } = finishedDate;
        public DateTime CreateDate { get; set; } = createDate;
        public DateTime? UpdatedDate { get; set; } = updatedDate;
    }
}
