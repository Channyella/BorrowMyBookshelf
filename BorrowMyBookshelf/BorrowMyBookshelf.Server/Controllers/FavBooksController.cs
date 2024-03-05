using BorrowMyBookshelf.Server.Models.FavBooks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BorrowMyBookshelf.Server.Controllers
{
    [Authorize]
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
        public long Post([FromForm] CreateFavBooks createFavBooks)
        {
            return dbConnector.CreateFavBook(createFavBooks);
        }

        // PUT api/<FavBooksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] UpdateFavBooks updateFavBooks)
        {
            dbConnector.UpdateFavBook(updateFavBooks, id);
        }

        // DELETE api/<FavBooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dbConnector.DeleteById(id);
        }
    }
}
