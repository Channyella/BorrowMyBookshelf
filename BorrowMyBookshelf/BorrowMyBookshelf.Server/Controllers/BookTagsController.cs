using BorrowMyBookshelf.Server.Models.BookTags;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookTagsController : ControllerBase
    {
        private readonly BookTagsDatabaseConnector dbConnector = new BookTagsDatabaseConnector();
        // GET: api/<BookTagsController>
        [HttpGet]
        public IEnumerable<BookTags> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<BookTagsController>/5
        [HttpGet("{id}")]
        public BookTags? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<BookTagsController>
        [HttpPost]
        public void Post([FromForm] CreateBookTags createBookTags)
        {
            dbConnector.CreateBookTags(createBookTags);
        }

        // PUT api/<BookTagsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BookTagsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
