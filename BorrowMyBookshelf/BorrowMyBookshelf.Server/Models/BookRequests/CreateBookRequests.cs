using static BorrowMyBookshelf.Server.Models.BookRequests.BookRequests;

namespace BorrowMyBookshelf.Server.Models.BookRequests
{
    public class CreateBookRequests
    {
        public int UserBookId { get; set; }
        public DateTime RequestDate { get; set; }
        public StatusEnum BookRequestStatus { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int BorrowerUserId { get; set; }
        public CreateBookRequests()
        {
            UserBookId = -1;
            RequestDate = DateTime.Now;
            BookRequestStatus = StatusEnum.Pending;
            DueDate = null;
            ReturnDate = null;
            BorrowerUserId = -1;
        }
    }
}
