using BorrowMyBookshelf.Server.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersDatabaseConnector dbConnector = new UsersDatabaseConnector();
        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<Users> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public Users? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<UserController>
        [HttpPost]
        public CreateUsers Post([FromForm] CreateUsers createUsers)
        {
            dbConnector.CreateUsers(createUsers);
            return createUsers;
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateUsers updateUsers)
        {
            dbConnector.UpdateUsers(updateUsers, id);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
