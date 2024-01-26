using BorrowMyBookshelf.Server.Models.Authors;
using BorrowMyBookshelf.Server.Models.Users;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly AuthorsDatabaseConnector dbConnector = new AuthorsDatabaseConnector();
        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<Authors> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public Authors? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
