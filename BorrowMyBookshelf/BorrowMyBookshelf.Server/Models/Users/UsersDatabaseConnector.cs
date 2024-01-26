using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Users
{
    public class UsersDatabaseConnector : DatabaseConnector<Users>
    {
        protected override string TableName => "users";
        protected override string Id => "user_id";

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

    }
}
