using BorrowMyBookshelf.Server.Models.Books;
using BorrowMyBookshelf.Server.Models.UserBooks;
using MySql.Data.MySqlClient;
using static BorrowMyBookshelf.Server.Models.UserBooks.UserBooks;

namespace BorrowMyBookshelf.Server.Models.BookshelfBooks
{
    public class UserBooksOnBookshelfDatabaseConnector : DatabaseConnector<UserBooksOnBookshelf>
    {
        protected override string TableName => "bookshelf_books JOIN user_books ON bookshelf_books.user_book_id = user_books.user_book_id JOIN books ON user_books.book_id = books.book_id JOIN authors ON books.author_id = authors.author_id JOIN book_genres ON books.book_id = book_genres.book_id JOIN genres ON book_genres.genre_id = genres.genre_id";
        protected override string SelectColumns => "bookshelf_books.*, user_books.*, books.*, authors.*, GROUP_CONCAT(genres.genre_type SEPARATOR ', ') AS book_genres, GROUP_CONCAT(genres.genre_id SEPARATOR ', ') AS book_genre_ids";
        protected override string GroupBy => "GROUP BY bookshelf_books.bookshelf_book_id;";
        protected override string Id => "bookshelf_books.bookshelf_id";
        protected override List<string> NullableColumns => [];

        protected override UserBooksOnBookshelf MakeRow(MySqlDataReader reader)
        {
            Books.Books book = new(
                reader.GetInt32("book_id"),
                reader.GetString("title"),
                reader.GetInt32("author_id"),
                SafeGetInt32("page_count", reader),
                reader.GetDateTime("create_date"),
                SafeGetString("image_file_name", reader),
                SafeGetString("description", reader),
                SafeGetInt32("audio_length", reader)
                );
            Authors.Authors author = new(
                reader.GetInt32("author_id"),
                reader.GetString("first_name"),
                SafeGetString("middle_name", reader),
                reader.GetString("last_name")
                );

            string[] genreStringList = reader.GetString("book_genres").Split(", ");
            int[] genreIdList = reader.GetString("book_genre_ids").Split(", ").Select(x => Int32.Parse(x)).ToArray();
            Genres.Genres[] combinedGenres = genreIdList.Zip(genreStringList, (id, genre) => new Genres.Genres(id, genre)).ToArray();

            DetailedBook detailedBook = new(book, author, combinedGenres);

            DetailedUserBooks detailedUserBook = new(
                reader.GetInt32("user_book_id"),
                reader.GetInt32("user_id"),
                detailedBook,
                reader.GetBoolean("borrowable"),
                ParseBookEnum(reader.GetString("book_format"))
            );
            return new UserBooksOnBookshelf(
                reader.GetInt32("bookshelf_book_id"),
                reader.GetInt32("bookshelf_id"),
                detailedUserBook
                );
        }
        private BookFormatEnum ParseBookEnum(string bookFormat)
        {
            if (bookFormat == "paperback")
            {
                return BookFormatEnum.Paperback;
            }
            else if (bookFormat == "hardcover")
            {
                return BookFormatEnum.Hardcover;
            }
            else if (bookFormat == "eBook")
            {
                return BookFormatEnum.eBook;
            }
            else
            {
                return BookFormatEnum.AudioBook;
            }
        }
        public List<UserBooksOnBookshelf> GetUserBooksOnBookshelfById(int bookshelfId)
        {
            return GetByForeignKey("bookshelf_id", bookshelfId);
        }
    }
}
