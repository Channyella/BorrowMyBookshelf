using BorrowMyBookshelf.Server.Models.Books;
using BorrowMyBookshelf.Server.Models.UserBooks;
using MySql.Data.MySqlClient;
using static BorrowMyBookshelf.Server.Models.UserBooks.UserBooks;

namespace BorrowMyBookshelf.Server.Models.BookshelfBooks
{
    public class UserBooksOnBookshelfDatabaseConnector : DatabaseConnector<UserBooksOnBookshelf>
    {
        protected override string TableName => @"
        bookshelf_books
            JOIN user_books ON bookshelf_books.user_book_id = user_books.user_book_id
            JOIN books ON user_books.book_id = books.book_id
            JOIN authors ON books.author_id = authors.author_id
            LEFT JOIN book_genres ON books.book_id = book_genres.book_id
            LEFT JOIN genres ON book_genres.genre_id = genres.genre_id
            LEFT JOIN
                (SELECT *, 
                    users.first_name as user_first_name, users.last_name as user_last_name,
                    ROW_NUMBER() OVER
                    (PARTITION BY book_requests.user_book_id
                    ORDER BY CASE book_requests.book_request_status
                    WHEN ""borrowed"" THEN 1
                    WHEN ""accepted"" THEN 2 
                    WHEN ""pending"" THEN 3
                    WHEN ""returned"" THEN 4
                    WHEN ""denied"" THEN 5 END)
                AS row_num FROM book_requests 
                    JOIN users ON book_requests.borrower_user_id = users.user_id
                    WHERE book_requests.book_request_status IN (""borrowed"", ""accepted"",
                    ""pending"")
                ) 
                as most_recent_book_request
                ON user_books.user_book_id = most_recent_book_request.user_book_id 
                AND row_num = 1";
        protected override string SelectColumns => "bookshelf_books.*, user_books.*, books.*, authors.*, most_recent_book_request.*, GROUP_CONCAT(genres.genre_type SEPARATOR ', ') AS book_genres, GROUP_CONCAT(genres.genre_id SEPARATOR ', ') AS book_genre_ids";
        protected override string GroupBy => "GROUP BY bookshelf_books.bookshelf_book_id, most_recent_book_request.book_request_id;";
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
            BookRequests.BookRequests? bookRequest = SafeGetInt32("book_request_id", reader) == null ? null : new(
                reader.GetInt32("book_request_id"),
                reader.GetInt32("user_book_id"),
                reader.GetDateTime("request_date"),
                ParseStatusEnum(reader.GetString("book_request_status")),
                SafeGetDateTime("due_date", reader),
                SafeGetDateTime("return_date", reader),
                new Users.Users(reader.GetInt32("borrower_user_id"),
                    reader.GetString("user_first_name"),
                    reader.GetString("user_last_name"),
                    reader.GetString("email"),
                    reader.GetString("password_hash"),
                    SafeGetString("notes", reader),
                    SafeGetString("image_file_name", reader),
                    reader.GetDateTime("create_date"),
                    SafeGetDateTime("updated_date", reader)
                )
                );

            string[] genreStringList = SafeGetStringWithDefault("book_genres", reader).Split(", ").Where(x => x.Length > 0).ToArray();
            int[] genreIdList = SafeGetStringWithDefault("book_genre_ids", reader).Split(", ").Where(x => x.Length > 0).Select(x => Int32.Parse(x)).ToArray();
            Genres.Genres[] combinedGenres = genreIdList.Zip(genreStringList, (id, genre) => new Genres.Genres(id, genre)).ToArray();

            DetailedBook detailedBook = new(book, author, combinedGenres);

            DetailedUserBooks detailedUserBook = new(
                reader.GetInt32("user_book_id"),
                reader.GetInt32("user_id"),
                detailedBook,
                bookRequest,
                reader.GetBoolean("borrowable"),
                ParseBookEnum(reader.GetString("book_format"))
            );
            return new UserBooksOnBookshelf(
                reader.GetInt32("bookshelf_book_id"),
                reader.GetInt32("bookshelf_id"),
                detailedUserBook
                );
        }
        private static BookRequests.BookRequests.StatusEnum ParseStatusEnum(string status)
        {
            if (status == "pending")
            {
                return BookRequests.BookRequests.StatusEnum.Pending;
            }
            else if (status == "accepted")
            {
                return BookRequests.BookRequests.StatusEnum.Accepted;
            }
            else if (status == "denied")
            {
                return BookRequests.BookRequests.StatusEnum.Denied;
            }
            else if (status == "borrowed")
            {
                return BookRequests.BookRequests.StatusEnum.Borrowed;
            }
            else
            {
                return BookRequests.BookRequests.StatusEnum.Returned;
            }
        }
        private static BookFormatEnum ParseBookEnum(string bookFormat)
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
