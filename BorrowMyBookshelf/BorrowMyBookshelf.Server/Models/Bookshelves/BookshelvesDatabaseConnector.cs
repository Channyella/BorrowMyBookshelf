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
        public long CreateBookshelf(CreateBookshelves createBookshelves)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("bookshelf_name", createBookshelves.BookshelfName),
                    ("user_id", createBookshelves.UserId)
                ];
            return Insert(columnsWithValues);
        }
        public void UpdateBookshelf(UpdateBookshelves updateBookshelves, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("bookshelf_name", updateBookshelves.BookshelfName),
                    ("user_id", updateBookshelves.UserId)
                ];
            List<string> NullableColumns = updateBookshelves.ColumnsToNullify.Split(',').ToList();
            Update(columnsWithValues, id, NullableColumns);
        }
    }
}
