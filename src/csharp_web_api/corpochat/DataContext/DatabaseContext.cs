using System;
using System.Data.SQLite;
using System.IO;

namespace corpochat.DataContext
{
    public class DatabaseContext : IDisposable
    {
        private readonly SQLiteConnection _connection;

        internal readonly string ACC_TABLE = "T_ACCOUNT";

        public DatabaseContext()
        {
            var path = Path.Combine(Environment.CurrentDirectory, "CorpoChat.sqlite");
            _connection = new SQLiteConnection($"Data Source={path}");

            Program.Created = !File.Exists(path);

            if (!File.Exists(path))
                File.Create(path).Close();

            if (_connection.State != System.Data.ConnectionState.Open)
                _connection.OpenAsync().Wait();

            CreateBaseTable();
        }

        internal SQLiteCommand CreateCommand() => _connection.CreateCommand();

        private void CreateBaseTable()
        {
            using var command = CreateCommand();

            var accountTableCmd = $@"CREATE TABLE IF NOT EXISTS {ACC_TABLE} (
                                            Email TEXT PRIMARY KEY NOT NULL,
                                            Name TEXT NOT NULL,
                                            Password TEXT NOT NULL
                                        )";

            command.CommandText = accountTableCmd;
            command.ExecuteNonQueryAsync().Wait();
            command.Reset();
        }

        #region Dispose
        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_connection.State != System.Data.ConnectionState.Closed)
                    _connection.Close();
                _connection.Dispose();
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}