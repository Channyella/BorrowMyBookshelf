using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.BookshelfBooks
{
    public class BookshelfBooksDatabaseConnector : DatabaseConnector<BookshelfBooks>
    {
        protected override string TableName => "bookshelf_books";
        protected override string Id => "bookshelf_book_id";
        protected override BookshelfBooks MakeRow(MySqlDataReader reader)
        {
            return new BookshelfBooks(
                reader.GetInt32("bookshelf_book_id"),
                reader.GetInt32("bookshelf_id"),
                reader.GetInt32("user_book_id")
                );
        }
    }
}
