namespace BorrowMyBookshelf.Server.Models.BookTags
{
    public class CreateBookTags
    {
        public int UserBookId { get; set; }
        public int TagId { get; set; }
        public CreateBookTags() {
            UserBookId = -1;
            TagId = -1;
        }

    }
}
