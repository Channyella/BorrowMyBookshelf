using MySql.Data.MySqlClient;
using System.Runtime.CompilerServices;

namespace BorrowMyBookshelf.Server.Models.BookTags
{
    public class BookTagsDatabaseConnector : DatabaseConnector<BookTags>
    {
        protected override string TableName => "book_tags";
        protected override string Id => "book_tag_id";
        protected override List<string> NullableColumns => [];
        protected override BookTags MakeRow(MySqlDataReader reader)
        {
            return new BookTags(
                reader.GetInt32("book_tag_id"),
                reader.GetInt32("user_book_id"),
                reader.GetInt32("tag_id")
                );
        }
        public long CreateBookTags(CreateBookTags createBookTags)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("user_book_id", createBookTags.UserBookId),
                    ("tag_id", createBookTags.TagId)
                ];
            return Insert(columnsWithValues);
        }
        public void UpdateBookTags(UpdateBookTags updateBookTags, int id) 
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("user_book_id", updateBookTags.UserBookId),
                    ("tag_id", updateBookTags.TagId)
                ];
            List<string> NullableColumns = updateBookTags.ColumnsToNullify.Split(',').ToList();
            Update(columnsWithValues, id, NullableColumns);
        }
    }
}
