﻿using BorrowMyBookshelf.Server.Models.Authors;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Genres
{
    public class GenresDatabaseConnector : DatabaseConnector<Genres>
    {
        protected override string TableName => "genres";
        protected override string Id => "genre_id";
        protected override List<string> NullableColumns => [];
        protected override Genres MakeRow(MySqlDataReader reader)
        {
            return new Genres(
                reader.GetInt32("genre_id"),
                reader.GetString("genre_type"));
        }

        public void CreateGenres(CreateGenres createGenres)
        {
            List<(string, object?)> columnsWithValues = new();
            columnsWithValues.Add(("genre_type", createGenres.GenreType));
            Insert(columnsWithValues);
        }
    }
}
