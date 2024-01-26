using MySql.Data.MySqlClient;
using System.Data;

namespace BorrowMyBookshelf.Server.Models
{
    abstract public class DatabaseConnector<T>
    {
        abstract protected string TableName { get; }
        abstract protected string Id { get; }
        private MySqlConnection GetConnection()
        {
            string connectionString = @"server=localhost;userid=root;password=1789;database=BorrowMyBookshelf";
            MySqlConnection con = new MySqlConnection(connectionString);
            return con;
        }
        public List<T> GetAllFromTable()
        {
            List<T> ResultList = new List<T>();
            MySqlConnection connection = GetConnection();
            try
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand($"SELECT * FROM {TableName}", connection);
                MySqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    ResultList.Add(MakeRow(reader));
                }
                reader.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            connection.Close();
            return ResultList;
        }

        public T? GetById(int id)
        {
            T? result = default;
            MySqlConnection connection = GetConnection();
            try
            {
                connection.Open();
                MySqlCommand command = new MySqlCommand($"SELECT * FROM {TableName} WHERE {Id} = {id};", connection);
                MySqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    result = MakeRow(reader);
                }
                reader.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            connection.Close();
            return result;
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
        abstract protected T MakeRow(MySqlDataReader reader);
    }
}
