using BorrowMyBookshelf.Server.Models.Friends;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly FriendsDatabaseConnector dbConnector = new FriendsDatabaseConnector();
        private readonly DetailedFriendDatabaseConnector friendDbConnector = new DetailedFriendDatabaseConnector();
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

        // GET api/<FriendsController>/friend-info/5
        [HttpGet("friend-info/{id}")]
        public IEnumerable<DetailedFriend> GetFriendsByUserId(int id)
        {
            return friendDbConnector.GetFriends(id);
        }

        // GET api/<FriendsController>/friend-requests/5
        [HttpGet("friend-requests/{id}")]
        public IEnumerable<DetailedFriend> GetFriendRequestsByUserId(int id)
        {
            return friendDbConnector.GetFriendRequests(id);
        }

        // POST api/<FriendsController>
        [HttpPost]
        public long Post([FromForm] CreateFriends createFriends)
        {
            return dbConnector.CreateFriends(createFriends);
        }

        // PUT api/<FriendsController>/5
        [HttpPut("{id}")]
        public void Put(int id)
        {
            dbConnector.UpdateFriends(id);
        }

        // DELETE api/<FriendsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
