using BorrowMyBookshelf.Server.Models.Bookshelves;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookshelvesController : ControllerBase
    {
        private readonly BookshelvesDatabaseConnector dbConnector = new();
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

        //Get api/<BookshelvesController>/user-id/5
        [HttpGet("user-id/{id}")]
        public IEnumerable<Bookshelves> GetAllByUserId(int id) { 
            return dbConnector.BookshelfByUserId(id);
        }

        // POST api/<BookshelvesController>
        [HttpPost]
        public long Post([FromForm] CreateBookshelves createBookshelves)
        {
            return dbConnector.CreateBookshelf(createBookshelves);
        }

        // PUT api/<BookshelvesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateBookshelves updateBookshelves)
        {
            dbConnector.UpdateBookshelf(updateBookshelves, id);
        }

        // DELETE api/<BookshelvesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool res = dbConnector.DeleteById(id);
            if (res)
            {
                return Ok(res);
            }
            else
            {
                return BadRequest("Failed to delete");
            }
        }
    }
}
