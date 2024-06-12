using System.Collections.Generic;
using System;
using corpochat.Models;

namespace corpochat.ResourceAccess.Interfaces
{
    public interface IAccounts : IDisposable
    {
        IEnumerable<Account> GetAccounts();
        bool AddNewUser(Account account, string confirmPassword);
        Account GetLogin(Account account);
        bool DeleteAccount(string email);
    }
}