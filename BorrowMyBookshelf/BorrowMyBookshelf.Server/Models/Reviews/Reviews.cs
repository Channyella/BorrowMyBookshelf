﻿namespace BorrowMyBookshelf.Server.Models.Reviews
{
    public class Reviews
    {
        public int ReviewId { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public BookFormatEnum? BookFormat { get; set; }
        public string? Summary { get; set; }
        public int Rating { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FinishedDate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public Reviews(int reviewId, int userId, int bookId, BookFormatEnum? bookFormat, string? summary, int rating, DateTime? startDate, DateTime? finishedDate, DateTime createDate, DateTime? updatedDate)
        {
            ReviewId = reviewId;
            UserId = userId;
            BookId = bookId;
            BookFormat = bookFormat;
            Summary = summary;
            Rating = rating;
            StartDate = startDate;
            FinishedDate = finishedDate;
            CreateDate = createDate;
            UpdatedDate = updatedDate;
        }

        public enum BookFormatEnum
        {
            Physical = 1,
            eBook = 2,
            AudioBook = 3,
        }
    }
}
