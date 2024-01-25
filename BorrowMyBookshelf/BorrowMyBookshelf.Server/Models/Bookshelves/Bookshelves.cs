using MySql.Data.MySqlClient;
using System.Data;

namespace BorrowMyBookshelf.Server.Models.Bookshelves
{
    public class Bookshelves : DatabaseConnector
    {
        public int BookshelfId { get; set; }
        public string? BookshelfName { get; set; }
        public int UserId { get; set; }

        public Bookshelves(int bookshelfId, string? bookshelfName, int userId)
        {
            BookshelfId = bookshelfId;
            BookshelfName = bookshelfName;
            UserId = userId;
        }
    }
}
