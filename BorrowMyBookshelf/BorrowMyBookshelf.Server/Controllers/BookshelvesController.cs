using BorrowMyBookshelf.Server.Models.Bookshelves;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookshelvesController : ControllerBase
    {
        private readonly BookshelvesDatabaseConnector dbConnector = new BookshelvesDatabaseConnector();
        // GET: api/<BookshelvesController>
        [HttpGet]
        public IEnumerable<Bookshelves> Get()
        {
            return dbConnector.GetAllFromTable();
        }

        // GET api/<BookshelvesController>/5
        [HttpGet("{id}")]
        public Bookshelves? Get(int id)
        {
            return dbConnector.GetById(id);
        }

        // POST api/<BookshelvesController>
        [HttpPost]
        public void Post([FromForm] CreateBookshelves createBookshelves)
        {
            dbConnector.CreateBookshelf(createBookshelves);
        }

        // PUT api/<BookshelvesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateBookshelves updateBookshelves)
        {
            dbConnector.UpdateBookshelf(updateBookshelves, id);
        }

        // DELETE api/<BookshelvesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
