using MySql.Data.MySqlClient;

namespace BorrowMyBookshelf.Server.Models.Users
{
    public class UsersDatabaseConnector : DatabaseConnector<Users>
    {
        protected override string TableName => "users";
        protected override string Id => "user_id";

        protected override Users MakeRow(MySqlDataReader reader)
        {
            return new Users(reader.GetInt32("user_id"), 
                reader.GetString("first_name"),
                reader.GetString("last_name"),
                reader.GetString("email"),
                reader.GetString("password_hash"),
                reader.GetString("notes"),
                reader.GetString("image_file_name"),
                reader.GetDateTime("create_date"),
                reader.GetDateTime("updated_date")
                );
        }
    }
}
