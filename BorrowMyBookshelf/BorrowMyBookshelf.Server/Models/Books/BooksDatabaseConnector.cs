using BorrowMyBookshelf.Server.Models.Authors;
using BorrowMyBookshelf.Server.Models.BookGenres;
using BorrowMyBookshelf.Server.Models.BookshelfBooks;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Books
{
    public class BooksDatabaseConnector : DatabaseConnector<Books>
    {
        protected override string TableName => "books";
        protected override string Id => "book_id";
        protected override List<string> NullableColumns => ["page_count", "image_file_name", "description", "audio_length"];
        protected override Books MakeRow(MySqlDataReader reader)
        {
            return new Books(
                reader.GetInt32("book_id"),
                reader.GetString("title"),
                reader.GetInt32("author_id"),
                SafeGetInt32("page_count", reader),
                reader.GetDateTime("create_date"),
                SafeGetString("image_file_name", reader),
                SafeGetString("description", reader),
                SafeGetInt32("audio_length", reader)
                ) ;
        }

        public long CreateBook(CreateBooks createBooks)
        {
            List<(string, object?)> columnsWithValues =
            [
                ("title", createBooks.Title),
                ("author_id", createBooks.AuthorId),
                ("page_count", createBooks.PageCount),
                ("create_date", createBooks.CreateDate),
                ("image_file_name", createBooks.ImageFileName),
                ("description", createBooks.Description),
                ("audio_length", createBooks.AudioLength),
            ];
            List<(string, object?)> uniqueColumnsWithValues =
            [
                ("title", createBooks.Title),
                ("author_id", createBooks.AuthorId),
            ];
            List<Books> existingBook = GetByColumns(uniqueColumnsWithValues);
            if (existingBook.Count > 0)
            {
                return existingBook[0].BookId;
            }
            return Insert(columnsWithValues);
        }

        public void UpdateBook(UpdateBooks updateBooks, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("title", updateBooks.Title),
                    ("author_id", updateBooks.AuthorId),
                    ("page_count", updateBooks.PageCount),
                    ("create_date", updateBooks.CreateDate),
                    ("image_file_name", updateBooks.ImageFileName),
                    ("description", updateBooks.Description),
                    ("audio_length", updateBooks.AudioLength),
                ];
            List<string> columnsToNullify = [.. updateBooks.ColumnsToNullify.Split(',')];
            Update(columnsWithValues, id, columnsToNullify);
        }

        private static DetailedBook? BookToDetailedBook(Books book)
        {
            AuthorsDatabaseConnector authorsConnector = new();
            Authors.Authors? authorInfo = authorsConnector.GetById(book.AuthorId);
            if (authorInfo == null) return null;
            BookGenresDatabaseConnector bookGenresDatabaseConnector = new();
            List<Genres.Genres> genres = bookGenresDatabaseConnector.GetGenresByBookId(book.BookId);
            return new DetailedBook(book, authorInfo, [.. genres]);
        }
        public DetailedBook? GetDetailedBookById(int id)
        {
            Books? bookInfo = GetById(id);
            if (bookInfo == null) return null;
            return BookToDetailedBook(bookInfo);
        }

        public List<DetailedBook?> GetDetailedBooks()
        {
            List<Books> allBookInfo = GetAllFromTable();
            return allBookInfo.Select(book => BookToDetailedBook(book)).ToList();
        }
    }
}
