using System.Collections.Generic;
using System;
using corpochat.ResourceAccess.Interfaces;
using corpochat.DataContext;
using corpochat.ResourceAccess.Builder;
using corpochat.Models.Exceptions;
using corpochat.Models;
using System.Linq;

namespace corpochat.ResourceAccess
{
    public sealed class Accounts : IAccounts
    {
        private readonly DatabaseContext _database;
        private readonly string _tableName;

        public Accounts()
        {
            _database = new DatabaseContext();
            _tableName = _database.ACC_TABLE;
        }

        public IEnumerable<string> GetAccounts()
        {
            using var command = _database.CreateCommand();
            command.CommandText = $@"SELECT * FROM {_tableName}";
            var reader = command.ExecuteReader();

            return AccountEntityBuilder.Build(reader).Select(acc => acc.Email);
        }

        public bool AddNewUser(Account account, string confirmPassword)
        {
            var validation = new ValidationException();

            if (account.Name.Length < 3)
                validation.AddError("Nome de usuário deve ter ao mínimo 3 caracteres");

            if (account.Password != confirmPassword)
                validation.AddError("Senhas precisam ser iguais");

            using (var cmd = _database.CreateCommand())
            {
                cmd.CommandText = $@"SELECT 
                                            *
                                        FROM 
                                            {_tableName} 
                                        WHERE 
                                            Email = @Email";

                cmd.Parameters.AddWithValue("@Email", account.Email);

                var reader = cmd.ExecuteReader();

                var exist = AccountEntityBuilder.Build(reader).Count;

                if (exist > 0)
                    validation.AddError("Conta já cadastrada no sistema, faça login");
            }

            if (validation.ErrosList.Count > 0)
                throw validation;

            using var command = _database.CreateCommand();

            command.CommandText = $@"INSERT INTO {_tableName}(
                                            Email, 
                                            Name, 
                                            Password) 
                                        VALUES (
                                            @Email, 
                                            @Name, 
                                            @Password)";

            command.Parameters.AddWithValue("@Email", account.Email);
            command.Parameters.AddWithValue("@Name", account.Name);
            command.Parameters.AddWithValue("@Password", account.Password);

            var count = command.ExecuteNonQuery();

            return count > 0;
        }

        public Account GetLogin(Account account)
        {
            using var command = _database.CreateCommand();

            command.CommandText = $@"SELECT * FROM 
                                        {_tableName}
                                    WHERE 
                                        Email = @Email AND
                                        Password = @Password";

            command.Parameters.AddWithValue("@Email", account.Email);
            command.Parameters.AddWithValue("@Password", account.Password);

            var reader = command.ExecuteReader();

            var result = AccountEntityBuilder.Build(reader);

            if (result.Count <= 0)
            {
                var validation = new ValidationException();
                validation.AddError("Nenhuma conta encontrada para esse email ou a senha não é válida, tente novamente ou crie uma conta");
                throw validation;
            }

            result[0].Password = "";
            return result[0];
        }

        public bool DeleteAccount(string email)
        {
            using var command = _database.CreateCommand();

            command.CommandText = $@"DELETE FROM 
                                        {_tableName} 
                                    WHERE 
                                        Email = @Email";

            command.Parameters.AddWithValue("@Email", email);

            var rowsAffected = command.ExecuteNonQuery();

            return rowsAffected > 0;
        }

        #region [ Dispose ]
        private void Dispose(bool disposing)
        {
            if (disposing)
                _database.Dispose();
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
