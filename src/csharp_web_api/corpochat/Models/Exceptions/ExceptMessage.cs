﻿using System;

namespace corpochat.Models.Exceptions
{
    [Serializable]
    public class ExceptMessage
    {
        public Exception Exception { get; set; } = new Exception();
        public string Message { get; set; } = "";
    }
}