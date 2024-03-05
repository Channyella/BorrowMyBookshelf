using MySql.Data.MySqlClient;
using System.Text;

namespace BorrowMyBookshelf.Server.Models.Authors
{
    public class AuthorsDatabaseConnector : DatabaseConnector<Authors>
    {
        protected override string TableName => "authors";
        protected override string Id => "author_id";
        protected override List<string> NullableColumns => ["middle_name"];
        protected override Authors MakeRow(MySqlDataReader reader)
        {
            return new Authors(
                reader.GetInt32("author_id"),
                reader.GetString("first_name"),
                SafeGetString("middle_name", reader),
                reader.GetString("last_name")
                );
        }

        public long CreateAuthor(CreateAuthors createAuthors)
        {
            List<(string, object?)> columnsWithValues = new();
            columnsWithValues.Add(("first_name", createAuthors.FirstName));
            columnsWithValues.Add(("middle_name", createAuthors.MiddleName));
            columnsWithValues.Add(("last_name", createAuthors.LastName));
            List<Authors> existingAuthor = GetByColumns(columnsWithValues);
            if (existingAuthor.Count() > 0)
            {
                return existingAuthor[0].AuthorId;
            }
            return Insert(columnsWithValues);
        }
        public void UpdateAuthor(UpdateAuthors updateAuthors, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("first_name", updateAuthors.FirstName),
                    ("middle_name", updateAuthors.MiddleName),
                    ("last_name", updateAuthors.LastName)
                ];
            List<string> columnsToNullify = updateAuthors.ColumnsToNullify.Split(',').ToList();
                Update(columnsWithValues, id, columnsToNullify);
        }
    }
}
