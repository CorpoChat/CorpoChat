using System.Collections.Generic;
using System;

namespace corpochat.Models.Exceptions
{
    public sealed class ValidationException : Exception
    {
        private readonly List<ExceptMessage> _errors;

        public ValidationException()
        {
            _errors = new List<ExceptMessage>();
        }

        public ValidationException(Exception ex, string message)
        {
            _errors = new List<ExceptMessage>
            {
                new() { Exception = ex, Message = message }
            };
        }

        public List<ExceptMessage> ErrosList => _errors;

        public void AddError(string message) => AddError(new Exception(message), message);

        public void AddError(Exception exception) => AddError(exception, exception.Message);

        public void AddError(Exception exception, string message) => _errors.Add(new ExceptMessage() { Exception = exception, Message = message });
    }
}