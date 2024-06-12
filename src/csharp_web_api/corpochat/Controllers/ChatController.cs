using corpochat.Models;
using corpochat.Controllers.WebSockets;
using corpochat.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace corpochat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<ObjectResult> SendMesssageAsync([FromBody] Message message)
        {
            try
            {
                await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.TargetEmail, message.MessageText);
                return Ok("Ok");
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.ErrosList);
            }
        }
    }
}