using MySql.Data.MySqlClient;
using System.Data;

namespace BorrowMyBookshelf.Server.Models
{
    public class DatabaseConnector
    {
        protected MySqlConnection GetConnection()
        {
            string connectionString = @"server=localhost;userid=root;password=1789;database=BorrowMyBookshelf";
            MySqlConnection con = new MySqlConnection(connectionString);
            return con;
        }
        public DataTable RunSqlCommand(string sqlQuery)
        {
            MySqlConnection con = GetConnection();

            con.Open();
            MySqlCommand command = new MySqlCommand(sqlQuery, con);
            MySqlDataAdapter adapter = new MySqlDataAdapter(command);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            con.Close();
            return dt;
        }

        public string RunSqlCommandString(string sqlQuery)
        {
            MySqlConnection con = GetConnection();
            int count;
            con.Open();
            MySqlCommand command = new MySqlCommand(sqlQuery, con);
            count = Convert.ToInt32(command.ExecuteScalar());
            con.Close();
            return count.ToString();
        }
    }
}
