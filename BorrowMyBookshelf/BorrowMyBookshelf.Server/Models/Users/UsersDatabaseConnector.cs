using BorrowMyBookshelf.Server.Models.Authors;
using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Users
{
    public class UsersDatabaseConnector : DatabaseConnector<Users>
    {
        protected override string TableName => "users";
        protected override string Id => "user_id";
        protected override List<string> NullableColumns => ["notes", "image_file_name", "update_date"];

        protected override Users MakeRow(MySqlDataReader reader)
        {
            reader.IsDBNull(reader.GetOrdinal("updated_date"));
            return new Users(reader.GetInt32("user_id"), 
                reader.GetString("first_name"),
                reader.GetString("last_name"),
                reader.GetString("email"),
                reader.GetString("password_hash"),
                SafeGetString("notes", reader),
                SafeGetString("image_file_name", reader),
                reader.GetDateTime("create_date"),
                SafeGetDateTime("updated_date", reader)
                );
        }
        public void CreateUsers(CreateUsers createUsers)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("first_name", createUsers.FirstName),
                    ("last_name", createUsers.LastName),
                    ("email", createUsers.Email),
                    ("password_hash", createUsers.PasswordHash),
                    ("notes", createUsers.Notes),
                    ("image_file_name", createUsers.ImageFileName),
                    ("create_date", createUsers.CreateDate),
                    ("updated_date", createUsers.UpdatedDate)
                ];
            Insert(columnsWithValues);
        }
        public void UpdateUsers(UpdateUsers updateUsers, int id)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("first_name", updateUsers.FirstName),
                    ("last_name", updateUsers.LastName),
                    ("email", updateUsers.Email),
                    ("password_hash", updateUsers.PasswordHash),
                    ("notes", updateUsers.Notes),
                    ("image_file_name", updateUsers.ImageFileName),
                    ("create_date", updateUsers.CreateDate),
                    ("updated_date", updateUsers.UpdatedDate)
                ];
            List<string> columnsToNullify = updateUsers.ColumnsToNullify.Split(',').ToList();
            Update(columnsWithValues, id, columnsToNullify);
        }

        public Users? FoundUser(string email, string passwordHash)
        {
            List<(string, object?)> columnsWithValues =
                [
                    ("email", email),
                    ("password_hash", passwordHash),
                ];
            List<Users> user = GetByColumns(columnsWithValues);
            if (user.Count == 0)
            {
                return null;
            }
            return user[0];
        }
    }
}
