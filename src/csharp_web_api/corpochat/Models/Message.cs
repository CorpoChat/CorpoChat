using System;

namespace corpochat.Models
{
    [Serializable]
    public class Message
    {
        public string TargetEmail { get; set; } = "";
        public string MessageText { get; set; } = "";
    }
}