using MySql.Data.MySqlClient;
using System.Data.Common;

namespace BorrowMyBookshelf.Server.Models.Bookshelves
{
    public class BookshelvesDatabaseConnector : DatabaseConnector<Bookshelves>
    {
        protected override string TableName => "bookshelves";
        protected override string Id => "bookshelf_id";
        protected override List<string> NullableColumns => [];
        protected override Bookshelves MakeRow(MySqlDataReader reader)
        {
            return new Bookshelves(
                reader.GetInt32("bookshelf_id"),
                reader.GetString("bookshelf_name"),
                reader.GetInt32("user_id")
                );
        }
        public void CreateBookshelf(CreateBookshelves createBookshelves)
        {
            List<(string, object)> columnsWithValues = new List<(string, object)>();
            columnsWithValues.Add(("bookshelf_name", createBookshelves.BookshelfName));
            columnsWithValues.Add(("user_id", createBookshelves.UserId));
            Insert(columnsWithValues);
        }
    }
}
