using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Bookshelves
{
    public class BookshelvesDatabaseConnector : DatabaseConnector<Bookshelves>
    {
        protected override string TableName => "bookshelves";
        protected override string Id => "bookshelf_id";
        protected override Bookshelves MakeRow(MySqlDataReader reader)
        {
            return new Bookshelves(
                reader.GetInt32("bookshelf_id"),
                reader.GetString("bookshelf_name"),
                reader.GetInt32("user_id")
                );
        }
    }
}
