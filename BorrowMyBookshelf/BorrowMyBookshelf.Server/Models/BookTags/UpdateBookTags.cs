namespace BorrowMyBookshelf.Server.Models.BookTags
{
    public class UpdateBookTags
    {
        public int? UserBookId { get; set; }
        public int? TagId { get; set; }
        public string ColumnsToNullify { get; set; }
        public UpdateBookTags()
        {
            UserBookId = null;
            TagId = null;
            ColumnsToNullify = String.Empty;
        }
    }
}
