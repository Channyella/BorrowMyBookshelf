using BorrowMyBookshelf.Server.Models.FavBooks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavBooksController : ControllerBase
    {
        private readonly FavBooksDatabaseConnector dbConnector = new FavBooksDatabaseConnector();
        // GET: api/<FavBooksController>
        [HttpGet]
        public IEnumerable<FavBooks> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<FavBooksController>/5
        [HttpGet("{id}")]
        public FavBooks? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<FavBooksController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FavBooksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FavBooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
