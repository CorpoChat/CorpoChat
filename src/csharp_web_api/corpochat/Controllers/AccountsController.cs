using corpochat.Models;
using corpochat.Models.Exceptions;
using corpochat.ResourceAccess;
using Microsoft.AspNetCore.Mvc;

namespace corpochat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountsController : ControllerBase
    {
        public AccountsController() { }

        [HttpGet]
        public ObjectResult GetAccounts()
        {
            try
            {
                using var resource = new Accounts();
                return Ok(resource.GetAccounts());
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.ErrosList);
            }
        }

        [HttpPost]
        public ObjectResult AddNewUser([FromQuery] string confirmPassword, [FromBody] Account account)
        {
            try
            {
                using var resource = new Accounts();
                return Ok(resource.AddNewUser(account, confirmPassword));
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.ErrosList);
            }
        }

        [HttpPut]
        public ObjectResult GetLogin([FromBody] Account account)
        {
            try
            {
                using var resource = new Accounts();
                return Ok(resource.GetLogin(account));
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.ErrosList);
            }
        }

        [HttpDelete]
        public ObjectResult DeleteAccount([FromQuery] string email)
        {
            try
            {
                using var resource = new Accounts();
                return Ok(resource.DeleteAccount(email));
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.ErrosList);
            }
        }
    }
}