using System;

namespace corpochat.Models
{
    [Serializable]
    public sealed class Account
    {
        public string Email { get; set; } = "";
        public string Name { get; set; } = "";
        public string Password { get; set; } = "";
    }
}