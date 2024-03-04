using BorrowMyBookshelf.Server.Models.Books;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BooksDatabaseConnector dbConnector = new();
        // GET: api/<BooksController>
        [HttpGet]
        public IEnumerable<Books> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public Books? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // GET api/<BooksController>/5/detailed
        [HttpGet("{id}/detailed")]
        public DetailedBook? GetDetailed(int id)
        {
            return dbConnector.GetDetailedBookById(id);
        }

        // GET api/<BooksController>/detailed
        [HttpGet("detailed")]
        public List<DetailedBook?> GetDetailed()
        {
            return dbConnector.GetDetailedBooks();
        }

        // POST api/<BooksController>
        [HttpPost]
        public void Post([FromForm] CreateBooks createBooks)
        {
            dbConnector.CreateBook(createBooks);
        }

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateBooks updateBooks)
        {
            dbConnector.UpdateBook(updateBooks, id);
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
