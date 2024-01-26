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
                MySqlCommand command = new MySqlCommand($"SELECT * FROM {TableName};", connection);
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
        protected DateTime? SafeGetDateTime(string column, MySqlDataReader reader)
        {
            int columnIndex = reader.GetOrdinal(column);
            if (reader.IsDBNull(columnIndex))
            {
                return null;
            }
            else
            {
                return reader.GetDateTime(columnIndex);
            }
        }
        protected string? SafeGetString(string column, MySqlDataReader reader)
        {
            int columnIndex = reader.GetOrdinal(column);
            if (reader.IsDBNull(columnIndex))
            {
                return null;
            }
            else
            {
                return reader.GetString(columnIndex);
            }
        }
        abstract protected T MakeRow(MySqlDataReader reader);
    }
}
