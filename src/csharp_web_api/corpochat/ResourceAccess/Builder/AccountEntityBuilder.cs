using corpochat.Models;
using System.Collections.Generic;
using System.Data.SQLite;

namespace corpochat.ResourceAccess.Builder
{
    internal static class AccountEntityBuilder
    {
        internal static List<Account> Build(SQLiteDataReader reader)
        {
            var accounts = new List<Account>();

            if (!reader.HasRows)
                return accounts;

            while (reader.Read())
            {
                accounts.Add(new Account
                {
                    Email = (string)reader["Email"],
                    Name = (string)reader["Name"],
                    Password = (string)reader["Password"]
                });
            }

            reader.Close();
            return accounts;
        }
    }
}