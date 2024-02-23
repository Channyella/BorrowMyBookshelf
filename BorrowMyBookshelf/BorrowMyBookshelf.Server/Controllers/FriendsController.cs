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
        public void Post([FromForm] CreateFriends createFriends)
        {
            dbConnector.CreateFriends(createFriends);
        }

        // PUT api/<FriendsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateFriends updateFriends)
        {
            dbConnector.UpdateFriends(updateFriends, id);
        }

        // DELETE api/<FriendsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
