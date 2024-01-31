using BorrowMyBookshelf.Server.Models.BookshelfBooks;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Books
{
    public class BooksDatabaseConnector : DatabaseConnector<Books>
    {
        protected override string TableName => "books";
        protected override string Id => "book_id";
        protected override List<string> NullableColumns => [];
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

        public void CreateBook(CreateBooks createBooks)
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
            Insert(columnsWithValues);
        }
    }
}
