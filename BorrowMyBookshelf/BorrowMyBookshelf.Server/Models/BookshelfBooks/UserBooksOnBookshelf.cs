using BorrowMyBookshelf.Server.Models.UserBooks;

namespace BorrowMyBookshelf.Server.Models.BookshelfBooks
{
    public class UserBooksOnBookshelf
    {
        public int BookshelfBookId { get; set; }
        public int BookshelfId { get; set; }

        // DetailedUserBook contains userId, Book, Authors, and Genres[] 
        public DetailedUserBooks UserBook { get; set; }
        public UserBooksOnBookshelf(int bookshelfBookId, int bookshelfId, DetailedUserBooks userBook)
        {
            BookshelfBookId = bookshelfBookId;
            BookshelfId = bookshelfId;
            UserBook = userBook;
        }
    }
}
