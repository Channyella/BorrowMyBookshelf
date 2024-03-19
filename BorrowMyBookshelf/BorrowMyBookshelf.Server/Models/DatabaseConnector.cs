using Google.Protobuf.WellKnownTypes;
using MySql.Data.MySqlClient;
using Mysqlx.Crud;
using Mysqlx.Session;
using MySqlX.XDevAPI.Relational;
using System.Data;
using System.Runtime.CompilerServices;
using System.Text;

namespace BorrowMyBookshelf.Server.Models
{
    abstract public class DatabaseConnector<T>
    {
        abstract protected string TableName { get; }
        protected virtual string SelectColumns => "*";
        protected virtual string GroupBy => "";
        abstract protected string Id { get; }
        abstract protected List<string> NullableColumns { get; }
        private static MySqlConnection GetConnection()
        {
            string connectionString = @"server=localhost;userid=root;password=1789;database=BorrowMyBookshelf";
            MySqlConnection con = new(connectionString);
            return con;
        }
        public List<T> GetAllFromTable()
        {
            List<T> ResultList = [];
            MySqlConnection connection = GetConnection();
            try
            {
                connection.Open();
                MySqlCommand command = new($"SELECT {SelectColumns} FROM {TableName} {GroupBy};", connection);
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

        public List<T> GetByColumns(List<(string, object?)> columnsWithValues, string conditionConjunction = "AND")
        {
            List<(string, object)> safeColumnsWithValues = Safe(columnsWithValues).ToList();
            List<T> ResultList = [];
            MySqlConnection connection = GetConnection();
            StringBuilder condition = new();
            bool isFirst = true;
            safeColumnsWithValues.ForEach(columnWithValue => {
                if (!isFirst)
                {
                    condition.Append($" {conditionConjunction} ");
                }
                condition.Append(columnWithValue.Item1 + " = @" + columnWithValue.Item1);
                isFirst = false;
            });
            try
            {
                connection.Open();
                string InsertQuery = ($"SELECT {SelectColumns} FROM {TableName} WHERE ({condition}) {GroupBy};");
                MySqlCommand cmd = new (InsertQuery, connection);
                safeColumnsWithValues.ForEach(columnWithValue => cmd.Parameters.AddWithValue("@" + columnWithValue.Item1, columnWithValue.Item2));
                MySqlDataReader reader = cmd.ExecuteReader();
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

        protected long Insert(List<(string, object?)> columnsWithValues)
        {
            long id = -1;
            List<(string, object)> safeColumnsWithValues = Safe(columnsWithValues).ToList();
            MySqlConnection connection = GetConnection();
            StringBuilder columns = new();
            StringBuilder values = new();
            bool isFirst = true;
            safeColumnsWithValues.ForEach(columnWithValue => {
                if (!isFirst)
                {
                    columns.Append(", ");
                    values.Append(", ");
                }
                columns.Append(columnWithValue.Item1);
                values.Append("@" + columnWithValue.Item1);
                isFirst = false;
            });
            try
            {
                connection.Open();
                string InsertQuery = ($"INSERT INTO {TableName} ({columns}) VALUES ({values});");
                MySqlCommand cmd = new(InsertQuery, connection);
                safeColumnsWithValues.ForEach(columnWithValue => cmd.Parameters.AddWithValue("@" + columnWithValue.Item1, columnWithValue.Item2));
                cmd.ExecuteNonQuery();
                id = cmd.LastInsertedId;
            } catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            connection.Close();
            return id;
        }

        protected void Update(List<(string, object?)> columnsWithValues, int id, List<string> columnsToNullify)
        {
            List<(string, object)> safeColumnsWithValues = Safe(columnsWithValues).ToList();
            MySqlConnection connection = GetConnection();
            StringBuilder formattedEntry = new();
            StringBuilder setColumnsNullQuery = new();
            bool isFirst = true;
            columnsToNullify.ForEach(column => {
                if (NullableColumns.Contains(column))
                {
                    if (!isFirst)
                    {
                        setColumnsNullQuery.Append(", ");
                    }
                    setColumnsNullQuery.Append(column + " = null");
                    isFirst = false;
                }
            });
            isFirst = true;
            safeColumnsWithValues.ForEach(columnWithValue => {
                if (!isFirst)
                {
                    formattedEntry.Append(", ");
                }
                formattedEntry.Append(columnWithValue.Item1 + " = @" + columnWithValue.Item1);
                isFirst = false;
            });
            string maybeCommaSeparator = formattedEntry.Length > 0 && setColumnsNullQuery.Length > 0 ? ", " : String.Empty;
            try
            {
                connection.Open();
                string InsertQuery = ($"UPDATE {TableName} SET {formattedEntry}{maybeCommaSeparator}{setColumnsNullQuery} WHERE {Id} = @id;");
                MySqlCommand cmd = new(InsertQuery, connection);
                safeColumnsWithValues.ForEach(columnWithValue => cmd.Parameters.AddWithValue("@" + columnWithValue.Item1, columnWithValue.Item2));
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            connection.Close();
        }

        public T? GetById(int id)
        {
            T? result = default;
            MySqlConnection connection = GetConnection();
            try
            {
                connection.Open();
                MySqlCommand command = new($"SELECT {SelectColumns} FROM {TableName} WHERE {Id} = {id} {GroupBy};", connection);
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
        public List<T> GetByForeignKey(string columnName, int id)
        {
            List<T> ResultList = [];
            MySqlConnection connection = GetConnection();
            try
            {
                connection.Open();
                MySqlCommand command = new($"SELECT {SelectColumns} FROM {TableName} WHERE {columnName} = {id} {GroupBy};", connection);
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
        public bool DeleteById(int id)
        {
            MySqlConnection connection = GetConnection();
            try
            {
                connection.Open();
                MySqlCommand command = new($"DELETE FROM {TableName} WHERE {Id} = {id};", connection);
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return false;
            }
            connection.Close();
            return true;
        }

        public bool DeleteByColumns(List<(string, object?)> columnsWithValues)
        {
            List<(string, object)> safeColumnsWithValues = Safe(columnsWithValues).ToList();
            MySqlConnection connection = GetConnection();
            StringBuilder condition = new();
            bool isFirst = true;
            safeColumnsWithValues.ForEach(columnWithValue => {
                if (!isFirst)
                {
                    condition.Append(" AND ");
                }
                condition.Append(columnWithValue.Item1 + " = @" + columnWithValue.Item1);
                isFirst = false;
            });
            try
            {
                connection.Open();
                string InsertQuery = ($"DELETE FROM {TableName} WHERE ({condition});");
                MySqlCommand cmd = new(InsertQuery, connection);
                safeColumnsWithValues.ForEach(columnWithValue => cmd.Parameters.AddWithValue("@" + columnWithValue.Item1, columnWithValue.Item2));
                cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return false;
            }
            connection.Close();
            return true;
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
        protected int? SafeGetInt32(string column, MySqlDataReader reader)
        {
            int columnIndex = reader.GetOrdinal(column);
            if (reader.IsDBNull(columnIndex))
            {
                return null;
            }
            else
            {
                return reader.GetInt32(columnIndex);
            }
        }
        private static IEnumerable<(string, object)> Safe(List<(string, object?)> source)
        {
            if (source == null)
            {
                yield break;
            }
            foreach (var item in source)
            {
                if (item.Item2 != null)
                {
                    yield return (item.Item1, item.Item2);
                }
            }
        }

        abstract protected T MakeRow(MySqlDataReader reader);
    }
}
