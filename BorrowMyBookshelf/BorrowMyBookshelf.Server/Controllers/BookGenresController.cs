using BorrowMyBookshelf.Server.Models.BookGenres;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookGenresController : ControllerBase
    {
        private readonly BookGenresDatabaseConnector dbConnector = new BookGenresDatabaseConnector();
        // GET: api/<BookGenresController>
        [HttpGet]
        public IEnumerable<BookGenres> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<BookGenresController>/5
        [HttpGet("{id}")]
        public BookGenres? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<BookGenresController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<BookGenresController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BookGenresController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
