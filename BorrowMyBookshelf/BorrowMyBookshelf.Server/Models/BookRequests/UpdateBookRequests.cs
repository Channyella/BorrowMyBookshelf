using static BorrowMyBookshelf.Server.Models.BookRequests.BookRequests;

namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class UpdateBookRequests
    {   
        public int? UserBookId { get; set; }
        public DateTime? RequestDate { get; set; }
        public StatusEnum? BookRequestStatus { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int? BorrowerUserId { get; set; }
        public string ColumnsToNulllify { get; set; }
        public UpdateBookRequests()
        {
            UserBookId = null;
            RequestDate = null;
            BookRequestStatus = null;
            BookRequestStatus = null;
            DueDate = null;
            ReturnDate = null;
            BorrowerUserId = null;
            ColumnsToNulllify = String.Empty;
        }
    }
}
