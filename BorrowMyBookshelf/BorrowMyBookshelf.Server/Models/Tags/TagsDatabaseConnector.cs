﻿using MySql.Data.MySqlClient;
using System.Diagnostics.Tracing;

namespace BorrowMyBookshelf.Server.Models.Tags
{
    public class TagsDatabaseConnector : DatabaseConnector<Tags>
    {
        protected override string TableName => "tags";
        protected override string Id => "tag_id";
        protected override List<string> NullableColumns => [];
        protected override Tags MakeRow(MySqlDataReader reader)
        {
            return new Tags(
                reader.GetInt32("tag_id"),
                reader.GetInt32("user_id"),
                reader.GetString("title")
                );
        }
        public long CreateTags(CreateTag createTag)
        {
            List<(string, object?)> columnsWithValues = 
                [
                    ("user_id", createTag.UserId),
                    ("title", createTag.Title)
                ];
            return Insert(columnsWithValues);
        }
        public void UpdateTags(UpdateTags updateTags, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("user_id", updateTags.UserId),
                    ("title", updateTags.Title)
                ];
            List<string> NullableColumns = updateTags.ColumnsToNullify.Split(',').ToList();
            Update(columnsWithValues, id, NullableColumns);
        }
    }
}
