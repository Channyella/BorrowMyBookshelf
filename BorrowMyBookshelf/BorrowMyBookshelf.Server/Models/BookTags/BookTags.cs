namespace BorrowMyBookshelf.Server.Models.BookTags
{
    public class BookTags
    {
        public int BookTagId { get; set; }
        public int UserBookId { get; set; }
        public int TagId { get; set; }
        public BookTags(int bookTagId, int userBookId, int tagId) {
            BookTagId = bookTagId;
            UserBookId = userBookId;
            TagId = tagId;
        }
    }
}
