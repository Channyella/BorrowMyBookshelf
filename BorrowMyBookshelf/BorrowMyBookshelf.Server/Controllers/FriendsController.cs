using BorrowMyBookshelf.Server.Models.Friends;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly FriendsDatabaseConnector dbConnector = new FriendsDatabaseConnector();
        // GET: api/<FriendsController>
        [HttpGet]
        public IEnumerable<Friends> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<FriendsController>/5
        [HttpGet("{id}")]
        public Friends? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<FriendsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FriendsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FriendsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
