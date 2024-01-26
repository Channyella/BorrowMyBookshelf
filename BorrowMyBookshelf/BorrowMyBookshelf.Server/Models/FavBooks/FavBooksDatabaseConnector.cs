﻿using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.FavBooks
{
    public class FavBooksDatabaseConnector : DatabaseConnector<FavBooks>
    {
        protected override string TableName => "fav_books";
        protected override string Id => "fav_book_id";
        protected override FavBooks MakeRow(MySqlDataReader reader)
        {
            return new FavBooks(
                reader.GetInt32("fav_book_id"),
                reader.GetInt32("user_id"),
                reader.GetInt32("book_id")
                );
        }
    }
}
