using BorrowMyBookshelf.Server.Models.Books;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.BookshelfBooks
{
    public class BookshelfBooksDatabaseConnector : DatabaseConnector<BookshelfBooks>
    {
        protected override string TableName => "bookshelf_books";
        protected override string Id => "bookshelf_book_id";
        protected override List<string> NullableColumns => [];
        protected override BookshelfBooks MakeRow(MySqlDataReader reader)
        {
            return new BookshelfBooks(
                reader.GetInt32("bookshelf_book_id"),
                reader.GetInt32("bookshelf_id"),
                reader.GetInt32("user_book_id")
                );
        }

        public long CreateBookshelfBooks(CreateBookshelfBooks createBookshelfBooks)
        {
            List<(string, object?)> columnWithValues =
                [
                    ("bookshelf_id", createBookshelfBooks.BookshelfId),
                    ("user_book_id", createBookshelfBooks.UserBookId)
                ];
            List<BookshelfBooks> existingBookshelfBooks = GetByColumns(columnWithValues);
            if (existingBookshelfBooks.Count > 0)
            {
                return existingBookshelfBooks[0].BookshelfBookId;
            }
            return Insert(columnWithValues);
        }

        public void UpdateBookshelfBooks(UpdateBookshelfBooks updateBookshelfBooks, int id)
        {
            List<(string, object?)> columnWithValues =
                [
                    ("bookshelf_id", updateBookshelfBooks.BookshelfId),
                    ("user_book_id", updateBookshelfBooks.UserBookId)
                ];
            List<string> NullableColumns = [.. updateBookshelfBooks.ColumnsToNullify.Split(',')];
            Update(columnWithValues, id, NullableColumns);
        }
    }
}
