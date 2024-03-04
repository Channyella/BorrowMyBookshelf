using BorrowMyBookshelf.Server.Models.BookGenres;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
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
        public void Post([FromForm] CreateBookGenres createBookGenres)
        {
            dbConnector.CreateBookGenres(createBookGenres);
        }

        // PUT api/<BookGenresController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateBookGenres updateBookGenres)
        {
            dbConnector.UpdateBookGenres(updateBookGenres, id);
        }

        // DELETE api/<BookGenresController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
