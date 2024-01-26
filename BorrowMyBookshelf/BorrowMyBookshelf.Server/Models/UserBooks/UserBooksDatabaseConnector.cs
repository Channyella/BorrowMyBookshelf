﻿using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.UserBooks
{
    public class UserBooksDatabaseConnector : DatabaseConnector<UserBooks>
    {
        protected override string TableName => "user_books";
        protected override string Id => "user_book_id";

        protected override UserBooks MakeRow(MySqlDataReader reader)
        {            
            return new UserBooks(
                reader.GetInt32("user_book_id"),
                reader.GetInt32("book_id"),
                reader.GetBoolean("borrowable"),
                ParseBookEnum(reader.GetString("book_format")),
                reader.GetInt32("user_id")
                );
        }

        private UserBooks.BookFormatEnum ParseBookEnum(string bookFormat)
        {
            if (bookFormat == "paperback")
            {
                return UserBooks.BookFormatEnum.Paperback;
            }
            else if (bookFormat =="hardcover")
            {
                return UserBooks.BookFormatEnum.Hardcover;
            }
            else if (bookFormat == "eBook")
            {
                return UserBooks.BookFormatEnum.eBook;
            }
            else
            {
                return UserBooks.BookFormatEnum.AudioBook;
            }
        }
    }
}
