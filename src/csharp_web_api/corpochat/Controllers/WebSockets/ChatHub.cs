using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace corpochat.Controllers.WebSockets
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string tagetMail, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", tagetMail, message);
        }
    }
}