using BorrowMyBookshelf.Server.Models.UserBooks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserBooksController : ControllerBase
    {
        private readonly UserBooksDatabaseConnector dbConnector = new UserBooksDatabaseConnector();
        // GET: api/<UserBooksController>
        [HttpGet]
        public IEnumerable<UserBooks> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<UserBooksController>/5
        [HttpGet("{id}")]
        public UserBooks? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<UserBooksController>
        [HttpPost]
        public long Post([FromForm] CreateUserBooks createUserBooks)
        {
           return dbConnector.CreateUserBooks(createUserBooks);  
        }

        // PUT api/<UserBooksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateUserBooks updateUserBooks)
        {
            dbConnector.UpdateUserBooks(updateUserBooks, id);
        }

        // DELETE api/<UserBooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
